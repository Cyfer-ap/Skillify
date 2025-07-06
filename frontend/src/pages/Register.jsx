import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
    role: "student",
    phone: "",
    bio: "",
  });
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await registerUser(form);
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      const data = err.response?.data;
      console.error(data);
      let errorMsg = "Registration failed.";
      if (data?.non_field_errors) errorMsg = data.non_field_errors[0];
      else if (typeof data === "object") {
        errorMsg = Object.values(data).flat().join(" ");
      }
      setError(errorMsg);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#000', 
      color: 'white', 
      position: 'relative', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Animated Background Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Floating geometric shapes */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: '80px',
          width: '16px',
          height: '16px',
          background: '#22d3ee',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.6
        }}></div>
        <div style={{
          position: 'absolute',
          top: '160px',
          right: '128px',
          width: '24px',
          height: '24px',
          background: '#a855f7',
          borderRadius: '50%',
          animation: 'bounce 2s infinite',
          opacity: 0.4,
          animationDelay: '1s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '160px',
          left: '64px',
          width: '32px',
          height: '32px',
          background: '#10b981',
          borderRadius: '50%',
          animation: 'pulse 2s infinite',
          opacity: 0.5,
          animationDelay: '2s'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '80px',
          width: '20px',
          height: '20px',
          background: '#ec4899',
          borderRadius: '50%',
          animation: 'bounce 2s infinite',
          opacity: 0.6,
          animationDelay: '3s'
        }}></div>
        
        {/* Animated grid background */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1 }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #1f2937 0%, #111827 50%, #000000 100%)'
          }}></div>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '4px',
                height: '4px',
                background: 'white',
                borderRadius: '50%',
                animation: 'pulse 2s infinite',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Register Container */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px'
      }}>
        <div style={{
          display: 'flex',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          backgroundColor: 'rgba(17, 24, 39, 0.5)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(55, 65, 81, 0.3)',
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.9)',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s ease-out',
          minHeight: '600px'
        }}>
          {/* Left Welcome Panel */}
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '48px 32px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Welcome panel background effects */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)'
            }}></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '24px',
                animation: 'bounce 2s infinite'
              }}>🚀</div>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                margin: 0,
                marginBottom: '16px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}>
                JOIN US
              </h2>
              <p style={{
                fontSize: '1.2rem',
                lineHeight: '1.6',
                margin: 0,
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>
                Start your journey with <span style={{ fontWeight: 'bold' }}>Skillify</span><br />
                Create your account and unlock your potential
              </p>
            </div>
          </div>

          {/* Right Register Form */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(17, 24, 39, 0.8)',
            padding: '48px 40px',
            backdropFilter: 'blur(8px)',
            overflowY: 'auto'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '2rem',
                fontWeight: '600',
                margin: 0,
                marginBottom: '8px',
                background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Sign up
              </h3>
              <p style={{
                color: '#9ca3af',
                fontSize: '0.9rem',
                margin: 0
              }}>
                Create your account to get started
              </p>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#fca5a5',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '24px',
                fontSize: '0.9rem'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Username and Email Row */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <input
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Phone and Bio Row */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    name="bio"
                    type="text"
                    placeholder="Bio"
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '14px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div style={{ marginBottom: '20px' }}>
                <select
                  name="role"
                  onChange={handleChange}
                  value={form.role}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: 'rgba(55, 65, 81, 0.3)',
                    border: '1px solid rgba(75, 85, 99, 0.5)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(4px)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#22d3ee';
                    e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="student" style={{ backgroundColor: '#374151', color: 'white' }}>Student</option>
                  <option value="teacher" style={{ backgroundColor: '#374151', color: 'white' }}>Teacher</option>
                </select>
              </div>

              {/* Password Fields */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    name="password1"
                    type={showPassword1 ? "text" : "password"}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      paddingRight: '50px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword1(!showPassword1)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}
                  >
                    {showPassword1 ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <input
                    name="password2"
                    type={showPassword2 ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '14px',
                      paddingRight: '50px',
                      backgroundColor: 'rgba(55, 65, 81, 0.3)',
                      border: '1px solid rgba(75, 85, 99, 0.5)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '0.9rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      backdropFilter: 'blur(4px)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#22d3ee';
                      e.target.style.boxShadow = '0 0 0 3px rgba(34, 211, 238, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword2(!showPassword2)}
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: '#22d3ee',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontWeight: '500'
                    }}
                  >
                    {showPassword2 ? 'HIDE' : 'SHOW'}
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  color: '#9ca3af',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    required
                    style={{
                      width: '16px',
                      height: '16px',
                      accentColor: '#22d3ee'
                    }}
                  />
                  I agree to the{' '}
                  <a
                    href="#"
                    style={{
                      color: '#22d3ee',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                    onMouseLeave={(e) => e.target.style.color = '#22d3ee'}
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginBottom: '16px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(34, 211, 238, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Create Account
              </button>

              <div style={{
                textAlign: 'center',
                margin: '16px 0',
                color: '#6b7280',
                fontSize: '0.9rem'
              }}>
                or
              </div>

              <button
                type="button"
                style={{
                  width: '100%',
                  padding: '16px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(75, 85, 99, 0.5)',
                  borderRadius: '12px',
                  color: '#9ca3af',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(4px)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#22d3ee';
                  e.target.style.color = '#22d3ee';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = 'rgba(75, 85, 99, 0.5)';
                  e.target.style.color = '#9ca3af';
                }}
              >
                Sign up with Google
              </button>

              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                fontSize: '0.9rem',
                color: '#9ca3af'
              }}>
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{
                    color: '#22d3ee',
                    textDecoration: 'none',
                    fontWeight: '500',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#0891b2'}
                  onMouseLeave={(e) => e.target.style.color = '#22d3ee'}
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25%); }
        }

        input::placeholder {
          color: rgba(156, 163, 175, 0.8);
        }

        select option {
          background-color: #374151;
          color: white;
        }

        @media (max-width: 768px) {
          .register-container > div {
            flex-direction: column;
            max-width: 400px;
          }
          
          .register-container .form-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;