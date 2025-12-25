import React from 'react';
import '../App.css';
import { Link } from 'react-router';

const LandingPage = () => {
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Master MERN stack with hands-on projects and real-world applications.",
      duration: "3 Months",
      videos: 50,
      fees: "₹ 12,999",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Data Science & Analytics",
      description: "Learn Python, Machine Learning, and Data Visualization techniques.",
      duration: "4 Months",
      videos: 65,
      fees: "₹ 15,999",
      badge: "New"
    },
    {
      id: 3,
      title: "Digital Marketing",
      description: "Master SEO, Social Media Marketing, and Digital Advertising strategies.",
      duration: "2 Months",
      videos: 40,
      fees: "₹ 9,999",
      badge: "Featured"
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build iOS & Android apps with React Native and Firebase.",
      duration: "3 Months",
      videos: 45,
      fees: "₹ 11,999",
      badge: null
    },
    {
      id: 5,
      title: "Cloud Computing",
      description: "AWS, Docker, Kubernetes, and CI/CD pipeline implementation.",
      duration: "4 Months",
      videos: 55,
      fees: "₹ 14,999",
      badge: null
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Learn design principles, Figma, and prototyping for modern applications.",
      duration: "2 Months",
      videos: 35,
      fees: "₹ 8,999",
      badge: null
    }
  ];

  return (
    <div className="student-portal">
      {/* Navigation */}
    {/* Navigation */}
<nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
  <div className="container">
    <a className="navbar-brand fw-bold text-primary fs-4" href="#">
      <i className="fas fa-book-open me-2"></i>Study Portal
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto d-flex justify-content-center align-items-center">
        <li className="nav-item mx-3">
          <a className="nav-link text-dark fw-medium" href="#home">Home</a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link text-dark fw-medium" href="#courses">Courses</a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link text-dark fw-medium" href="#how">How to Enroll</a>
        </li>
      </ul>
      <div className="d-flex justify-content-end">
        <Link className="btn btn-primary px-4 py-2 fw-medium" to="/login">
          <i className="fas fa-sign-in-alt me-2"></i>Student Login
        </Link>
      </div>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <section id="home" className="hero py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-5 fw-bold mb-4">
                Learn. Grow. <span className="text-primary">Succeed.</span>
              </h1>
              <p className="lead mb-4 text-secondary">
                Access quality courses and build skills for your future. Start your learning journey today.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#courses" className="btn btn-primary btn-lg px-4">
                  Browse Courses
                </a>
              </div>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="text-center">
                <div className="hero-stats p-4 bg-white rounded-3 shadow-sm">
                  <div className="row">
                    <div className="col-4">
                      <div className="stat-item">
                        <div className="text-primary fw-bold fs-3">50+</div>
                        <div className="text-muted small">Courses</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <div className="text-primary fw-bold fs-3">1000+</div>
                        <div className="text-muted small">Students</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="stat-item">
                        <div className="text-primary fw-bold fs-3">98%</div>
                        <div className="text-muted small">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="courses py-5 bg-light">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Available Courses</h2>
            <p className="text-muted">Choose from our curated collection of courses</p>
          </div>

          <div className="row g-4">
            {courses.map((course) => (
              <div key={course.id} className="col-md-6 col-lg-4">
                <div className="course-card card h-100 border-0 shadow-sm">
                  <div className="card-body p-4">
                    {course.badge && (
                      <span className={`badge mb-3 ${course.badge.toLowerCase()}`}>
                        {course.badge}
                      </span>
                    )}
                    <h5 className="fw-bold mb-3">{course.title}</h5>
                    <p className="text-secondary mb-4">{course.description}</p>
                    
                    <div className="course-info mb-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          <i className="far fa-clock me-1"></i> {course.duration}
                        </span>
                        <span className="text-muted">
                          <i className="fas fa-play-circle me-1"></i> {course.videos} videos
                        </span>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="text-primary mb-0">{course.fees}</h4>
                      <button 
                        className="btn btn-primary"
                        onClick={() => {
                          // This would redirect to login or enrollment page
                          window.location.href = "/login?redirect=course";
                        }}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <a href="/course/all-active-courses" className="btn btn-outline-primary">
              View All Courses
            </a>
          </div>
        </div>
      </section>

      {/* How to Enroll */}
      <section id="how" className="enroll-steps py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">How to Enroll</h2>
            <p className="text-muted">Simple steps to start learning</p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-user-plus text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Create Account</h5>
                <p className="text-muted">
                  Register with your email and create your student profile
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-book text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Choose Course</h5>
                <p className="text-muted">
                  Browse available courses and select the one you want to learn
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="step text-center p-4">
                <div className="step-icon bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3">
                  <i className="fas fa-play-circle text-white"></i>
                </div>
                <h5 className="fw-bold mb-3">Start Learning</h5>
                <p className="text-muted">
                  Access course videos and materials immediately after enrollment
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Benefits */}
      <section className="benefits py-5 bg-light">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h2 className="fw-bold mb-4">Why Choose Our Platform</h2>
              <div className="benefit-item d-flex mb-3">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-video text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Video Lessons</h5>
                  <p className="text-muted mb-0">High-quality video lectures with lifetime access</p>
                </div>
              </div>
              <div className="benefit-item d-flex mb-3">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-certificate text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Certificates</h5>
                  <p className="text-muted mb-0">Get certified upon course completion</p>
                </div>
              </div>
              <div className="benefit-item d-flex">
                <div className="benefit-icon bg-primary rounded-circle d-flex align-items-center justify-content-center me-3">
                  <i className="fas fa-laptop text-white"></i>
                </div>
                <div>
                  <h5 className="fw-bold">Learn Anywhere</h5>
                  <p className="text-muted mb-0">Access courses from any device, anytime</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="text-center">
                <div className="p-4 bg-white rounded-3 shadow-sm">
                  <h5 className="fw-bold mb-3">Ready to Start?</h5>
                  <p className="text-muted mb-4">
                    Join thousands of students who are already learning with us
                  </p>
                  <a href="/login" className="btn btn-primary btn-lg w-100">
                    Begin Your Journey
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-5 bg-dark text-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h5 className="fw-bold mb-4">
                <i className="fas fa-book-open me-2"></i>Study Portal
              </h5>
              <p className="text-light">
                A platform dedicated to student learning and growth through quality online courses.
              </p>
            </div>
            <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-4">For Students</h6>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/login" className="text-light text-decoration-none">Login</Link>
                </li>
                <li className="mb-2">
                  <a href="/course/all-active-courses" className="text-light text-decoration-none">All Courses</a>
                </li>
                <li className="mb-2">
                  <a href="/student/my-courses" className="text-light text-decoration-none">My Courses</a>
                </li>
                <li>
                  <a href="/student/change-password" className="text-light text-decoration-none">Account</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
              <h6 className="fw-bold mb-4">Need Help?</h6>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <i className="fas fa-envelope me-2 text-primary"></i>
                  <span className="text-light">help@studyportal.com</span>
                </li>
                <li>
                  <i className="fas fa-phone me-2 text-primary"></i>
                  <span className="text-light">+91 98765 43210</span>
                </li>
              </ul>
            </div>
            <div className="col-lg-3">
              <h6 className="fw-bold mb-4">Connect</h6>
              <div className="social-links">
                <a href="#" className="text-light me-3">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-light me-3">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-light me-3">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="text-light">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
          <hr className="my-4 bg-light" />
          <div className="text-center">
            <p className="mb-0 text-light">
              &copy; 2025 Study Portal. For student learning only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default LandingPage;