import React, { useState, useEffect, useCallback, useMemo } from 'react';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Memoize static data to prevent unnecessary re-renders
  const features = useMemo(() => [
    {
      icon: "👥",
      title: "1-on-1 Tutoring",
      description: "Get personalized attention with expert tutors tailored to your learning style.",
      color: "from-cyan-400 to-blue-400"
    },
    {
      icon: "⚡",
      title: "Instant Booking",
      description: "Book sessions instantly with our smart scheduling system. No waiting, just learning.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: "📚",
      title: "Collaborative Tools",
      description: "Interactive whiteboards, screen sharing, and real-time collaboration features.",
      color: "from-emerald-400 to-teal-400"
    }
  ], []);

  const testimonials = useMemo(() => [
    {
      name: "Sarah Johnson",
      role: "University Student",
      text: "Skillify transformed my learning experience. The tutors are amazing!",
      rating: 5,
      avatar: "🎓"
    },
    {
      name: "Mike Chen",
      role: "High School Student",
      text: "I improved my grades significantly thanks to the personalized approach.",
      rating: 5,
      avatar: "👨‍🎓"
    },
    {
      name: "Emma Davis",
      role: "Working Professional",
      text: "Perfect for learning new skills while managing a busy schedule.",
      rating: 5,
      avatar: "👩‍💼"
    }
  ], []);

  const stats = useMemo(() => [
    { number: "10,000+", label: "Happy Students", icon: "👥" },
    { number: "500+", label: "Expert Tutors", icon: "🎯" },
    { number: "50+", label: "Subjects", icon: "📖" },
    { number: "98%", label: "Success Rate", icon: "🏆" }
  ], []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimize testimonial rotation with useCallback
  const rotateTestimonial = useCallback(() => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(rotateTestimonial, 4000);
    return () => clearInterval(interval);
  }, [rotateTestimonial]);

  // Memoize button click handlers
  const handleStartLearning = useCallback(() => {
    console.log('Start Learning clicked');
  }, []);

  const handleWatchDemo = useCallback(() => {
    console.log('Watch Demo clicked');
  }, []);

  const handleGetStarted = useCallback(() => {
    console.log('Get Started clicked');
  }, []);

  const handleScheduleDemo = useCallback(() => {
    console.log('Schedule Demo clicked');
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="absolute top-4 left-4 bg-white text-black px-4 py-2 rounded z-50 transform -translate-y-16 focus:translate-y-0 transition-transform">
        Skip to main content
      </a>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-purple-400 rounded-full animate-bounce opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 left-16 w-8 h-8 bg-emerald-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '3s'}}></div>
        
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
      </div>

   
    

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <section className="relative z-10 px-6 py-20" aria-labelledby="hero-heading">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'transform translate-x-0 opacity-100' : 'transform -translate-x-full opacity-0'}`}>
                <h1 id="hero-heading" className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Learn
                  </span>
                  <br />
                  <span className="text-white drop-shadow-lg">Without Limits</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Experience the future of education with real-time 1-on-1 tutoring, 
                  instant booking, and cutting-edge collaborative learning tools.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <button 
                    onClick={handleStartLearning}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Start Learning</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                  <button 
                    onClick={handleWatchDemo}
                    className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:border-cyan-400 transition-all duration-300 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 group"
                  >
                    <span className="group-hover:animate-pulse">▶</span>
                    Watch Demo
                  </button>
                </div>
              </div>

              <div className={`lg:w-1/2 transition-all duration-1000 delay-500 ${isVisible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'}`}>
                <div className="relative">
                  <div className="w-full h-96 bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl overflow-hidden relative border border-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm border border-gray-700 animate-pulse">
                          <span className="text-6xl animate-bounce">📚</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Interactive Learning</h3>
                        <p className="text-gray-400">Real-time collaboration tools</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <span className="text-4xl animate-pulse">⭐</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 py-20 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
                  <div className="text-6xl mb-2 group-hover:animate-bounce">{stat.icon}</div>
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Why Choose Skillify?
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                We combine cutting-edge technology with proven teaching methods to deliver 
                an unparalleled learning experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className={`bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 hover:bg-gray-800/50 transition-all duration-300 transform hover:scale-105 border border-gray-800 hover:border-gray-700 group ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div className="text-6xl mb-4 group-hover:animate-pulse">{feature.icon}</div>
                  <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative z-10 py-20 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  What Our Students Say
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 text-center border border-gray-800 hover:border-gray-700 transition-all duration-300">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full flex items-center justify-center text-4xl border border-gray-700 animate-pulse">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                </div>
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <span key={i} className="text-2xl text-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.1}s`}}>⭐</span>
                  ))}
                </div>
                <blockquote className="text-xl text-gray-300 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
                <div className="text-white font-bold text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-cyan-400">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Learning Journey?
              </span>
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their learning experience with Skillify.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <span className="relative z-10 group-hover:animate-pulse">→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button 
                onClick={handleScheduleDemo}
                className="border-2 border-gray-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 hover:border-cyan-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              >
                Schedule a Demo
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                Skillify
              </div>
              <p className="text-gray-400">
                Transforming education through personalized learning experiences.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Find Tutors</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Book Sessions</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Learning Tools</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-pink-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-pink-400 transition-colors">Blog</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Skillify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;