import React, { startTransition, useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import { getAllCourses, getVideoDetails } from '../../services/adminCourseServices' // adjust path

const GetAllVideos = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  // Fetch videos when component loads
  useEffect(() => {
    fetchVideos()
  }, [])

const fetchVideos=async ()=>{
  const token =sessionStorage.getItem('token')
  const result=await getVideoDetails(token,104)
  console.log(result)
  if(result.status=="success"){
    setVideos(result.data)
    console.log(result.data)
  }else{
    console.log(result.error)
  }
  setLoading(false)
}

const loadCourse=async ()=>{
  const token= sessionStorage.getItem("token")
  const startDate="2025-01-01"
  const endDate="2026-01-01"
  const result=getAllCourses(token,startDate,endDate)
  if(result.status=="success"){
    
  }
}

  // Filter videos by course_id (optional)
  // const filteredVideos =
  //   courseFilter === 'all'
  //     ? videos
  //     : videos.filter(video => video.course_id === parseInt(courseFilter))

  // Dynamically get unique course IDs for dropdown
  // const courseOptions = [...new Set(videos.map(v => v.courseId))]

  return (
    
    <div>
      <AdminNavbar />
    <div className='container mt-4'>
      {/* Filter */}
      <select data-mdb-select-init>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
        <option value="5">Five</option>
        <option value="6">Six</option>
        <option value="7">Seven</option>
        <option value="8">Eight</option>
      </select>

      {/* Table */}
      <div className="table-responsive shadow-sm mt-3">
        <table className="table table-hover align-middle border mb-0">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Course ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>YouTube</th>
              <th>Added At</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">Loading...</td>
              </tr>
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">No videos found</td>
              </tr>
            ) : (
              videos.map(video => (
                <tr key={video.video_id}>
                  <td>{video.video_id}</td>
                  <td>{video.course_id}</td>
                  <td>{video.title}</td>
                  <td>{video.description}</td>
                  <td>
                    <a href={video.youtube_url} target="_blank" rel="noreferrer">
                      View
                    </a>
                  </td>
                  <td>{new Date(video.added_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default GetAllVideos;
