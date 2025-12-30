import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router'
import { getCoursesWithVideos } from '../services/courseServices'
import "../assets/videos.css"

function Videos() {
    const {courseId}=useParams()
    const navigate =useNavigate()
    const [courses,setCourses]=useState([])
    let [index,setIndex]=useState(0)
    useEffect(()=>{
      if(courseId)
        getVideos(courseId)
        console.log(courseId)
    },[courseId])

    const getVideos= async (courseId)=>{
        const token =sessionStorage.getItem('token')
        const result=await getCoursesWithVideos(token,courseId)
        if(result.status=="success"){
            setCourses(result.data)
            console.log(result.data)
            console.log(courses)
        }
    }
  const [selectedVideo, setSelectedVideo] = useState(0);
  
  // Function to extract YouTube ID from URL
  const getYouTubeId = (url) => {
    if (!url) return '';
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  };

  // Function to handle video selection
  const handleVideoSelect = (course, index) => {
    setSelectedVideo(index);
  };
  return (
 <div className="min-vh-100 bg-light">
  <Navbar />
  
  <div className="container py-4">
    <button 
      className="btn btn-outline-primary btn-sm mb-4 d-flex align-items-center gap-2" 
      onClick={() => navigate(-1)}
    >
      <i className="fas fa-arrow-left"></i> Back
    </button>
    
    {/* Course Header */}
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 fw-bold text-primary">{courses[0]?.course_name}</h2>
        
        <div className="row text-center">
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="p-3 rounded bg-light">
              <div className="text-muted small mb-2">
                <i className="fas fa-calendar-day me-2"></i>
                Start Date
              </div>
              <div className="fw-bold">
                {courses[0]?.start_date?.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="p-3 rounded bg-light">
              <div className="text-muted small mb-2">
                <i className="fas fa-calendar-check me-2"></i>
                End Date
              </div>
              <div className="fw-bold">
                {courses[0]?.end_date?.split("T")[0].split("-").reverse().join("-")}
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3 mb-md-0">
            <div className="p-3 rounded bg-light">
              <div className="text-muted small mb-2">
                <i className="fas fa-video me-2"></i>
                Total Videos
              </div>
              <div className="fw-bold">{courses.length}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 rounded bg-light">
              <div className="text-muted small mb-2">
                <i className="fas fa-graduation-cap me-2"></i>
                Status
              </div>
              <div className="fw-bold text-success">Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Main Content Area - Side by Side Layout */}
    <div className="row g-4">
      {/* Video Player - Left Side (Larger) */}
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white border-bottom py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <i className="fas fa-play-circle text-primary me-2"></i>
              Now Playing
            </h4>
          </div>
          
          <div className="card-body p-3">
            {/* YouTube Video Player */}
            <div className="ratio ratio-16x9 mb-4 rounded overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(courses[selectedVideo]?.youtube_url)}`}
                title={courses[selectedVideo]?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
                style={{
                    width: "699px",
                    height: "308px"

                }} ></iframe>
            </div>
            
            {/* Current Video Details */}
            <div className="px-2">
              <h5 className="fw-bold mb-3">{courses[selectedVideo]?.title}</h5>
              
              <div className="d-flex flex-wrap gap-3 mb-3">
                <div className="d-flex align-items-center">
                  <i className="far fa-calendar-alt text-muted me-2"></i>
                  <small className="text-muted">
                    Added: {courses[selectedVideo]?.added_at?.split("T")[0].split("-").reverse().join("-")}
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <i className="fas fa-list-ol text-muted me-2"></i>
                  <small className="text-muted">Video {selectedVideo + 1} of {courses.length}</small>
                </div>
              </div>
              
              <div className="bg-light p-3 rounded">
                <h6 className="fw-semibold mb-2">Description:</h6>
                <p className="mb-0 text-dark">{courses[selectedVideo]?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video List - Right Side (Smaller) */}
      <div className="col-lg-4">
        <div className="card border-0 shadow-sm h-100">
          <div className="card-header bg-white border-bottom py-3">
            <h4 className="mb-0 d-flex align-items-center">
              <i className="fas fa-list text-primary me-2"></i>
              Course Videos
            </h4>
          </div>
          
          <div className="card-body p-0" style={{maxHeight: '500px', overflowY: 'auto'}}>
            <div className="list-group list-group-flush">
              {courses.map((course, index) => (
                <div 
                  key={index}
                  className={`list-group-item list-group-item-action border-0 py-3 px-4 ${selectedVideo === index ? 'active' : ''}`}
                  onClick={() => setSelectedVideo(index)}
                  style={{cursor: 'pointer'}}
                >
                  <div className="d-flex align-items-center">
                    <div className="position-relative me-3">
                      <div className="bg-light rounded d-flex align-items-center justify-content-center"
                           style={{width: '48px', height: '36px'}}>
                        {selectedVideo === index ? (
                          <i className="fas fa-play text-primary"></i>
                        ) : (
                          <i className="far fa-play-circle text-muted"></i>
                        )}
                      </div>
                      <span className="position-absolute top-0 start-100 translate-middle badge bg-primary rounded-circle"
                            style={{fontSize: '0.65rem', minWidth: '20px', height: '20px'}}>
                        {index + 1}
                      </span>
                    </div>
                    
                    <div className="flex-grow-1">
                      <h6 className={`mb-1 fw-medium ${selectedVideo === index ? 'text-white' : 'text-dark'}`}>
                        {course.title}
                      </h6>
                      <small className={selectedVideo === index ? 'text-white-50' : 'text-muted'}>
                        <i className="far fa-clock me-1"></i>
                        {course.added_at?.split("T")[0].split("-").reverse().join("-")}
                      </small>
                    </div>
                    
                    <div className="ms-2">
                      <i className={`fas fa-chevron-right ${selectedVideo === index ? 'text-white' : 'text-muted'}`}></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Navigation Buttons Below Video */}
    <div className="row mt-4">
      <div className="col-12">
        <div className="card border-0 shadow-sm">
          <div className="card-body py-3">
            <div className="d-flex justify-content-between">
              <button 
                className="btn btn-outline-primary"
                onClick={() => setSelectedVideo(prev => Math.max(0, prev - 1))}
                disabled={selectedVideo === 0}
              >
                <i className="fas fa-arrow-left me-2"></i>
                Previous Video
              </button>
              
              <div className="d-flex align-items-center">
                <span className="badge bg-primary rounded-pill px-3 py-2">
                  Video {selectedVideo + 1} of {courses.length}
                </span>
              </div>
              
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedVideo(prev => Math.min(courses.length - 1, prev + 1))}
                disabled={selectedVideo === courses.length - 1}
              >
                Next Video
                <i className="fas fa-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default Videos
