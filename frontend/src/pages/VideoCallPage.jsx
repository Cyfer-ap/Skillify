import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get sessionId from URL
import axios from 'axios';

const VideoCallPage = () => {
  const { sessionId } = useParams();  // Retrieve sessionId from the URL params
  const [session, setSession] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [classStatus, setClassStatus] = useState('loading'); // 'loading', 'available', 'not_available'
  const [waitingTime, setWaitingTime] = useState(null);

  useEffect(() => {
    // Fetch the session details and check link availability
    axios.get(`/api/session/${sessionId}/`)
      .then(response => {
        const sessionData = response.data;
        setSession(sessionData);

        if (sessionData.jitsi_link) {
          setClassStatus('available');
        } else {
          setClassStatus('not_available');
        }

        // Check if user is authorized to join the class
        if (sessionData.student === 'current_user' || sessionData.teacher === 'current_user') {
          setIsAuthorized(true);
        }
      })
      .catch(error => {
        console.error("Error fetching session details", error);
      });
  }, [sessionId]);

  const calculateWaitingTime = () => {
    const currentTime = new Date();
    const sessionTime = new Date(session.scheduled_time);
    const diffInMinutes = (sessionTime - currentTime) / 60000;
    setWaitingTime(diffInMinutes);
  };

  useEffect(() => {
    if (session) {
      calculateWaitingTime();
    }
  }, [session]);

  if (!isAuthorized) {
    return <div>You are not authorized to join this class. Redirecting to your dashboard...</div>;
  }

  if (classStatus === 'not_available') {
    return <div>Class link will be available soon.</div>;
  }

  if (waitingTime < -60) {
    return <div>Class not started yet - please join at the allotted time.</div>;
  }

  if (waitingTime > 0 && waitingTime < 60) {
    return (
      <div>
        <p>Class starts in {waitingTime} minutes. You are in the waiting room.</p>
        <div className="timer">
          {/* Timer component */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2>Class is Live!</h2>
      <iframe
        src={session.jitsi_link}
        width="800"
        height="600"
        allow="camera; microphone; fullscreen; display-capture"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoCallPage;
