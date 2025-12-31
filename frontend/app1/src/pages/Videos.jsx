import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate, useParams } from "react-router";
import { getCoursesWithVideos } from "../services/courseServices";
import "../assets/videos.css";
function Videos() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (courseId) fetchVideos();
  }, [courseId]);

  const fetchVideos = async () => {
    const token = sessionStorage.getItem("token");
    const res = await getCoursesWithVideos(token, courseId);

    if (res.status === "success") {
      setVideos(res.data);
      setCurrentIndex(0); 
    }
  };

  const getYouTubeId = (url = "") => {
    if (!url) return "";

    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[7].length === 11 ? match[7] : "";
  };

  const currentVideo = videos[currentIndex];

  return (
    <div>
      <Navbar />
      <div className="container py-4">
        {/* Back */}
        <button
          className="btn btn-sm btn-outline-primary mb-3"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        {videos.length != 0 && (
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4 fw-bold text-primary">
                {videos[0]?.course_name}
              </h2>

              <div className="row text-center">
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="p-3 rounded bg-light">
                    <div className="text-muted small mb-2">
                      <i className="fas fa-calendar-day me-2"></i>
                      Start Date
                    </div>
                    <div className="fw-bold">
                      {videos[0]?.start_date
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
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
                      {videos[0]?.end_date
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-3 mb-md-0">
                  <div className="p-3 rounded bg-light">
                    <div className="text-muted small mb-2">
                      <i className="fas fa-video me-2"></i>
                      Total Videos
                    </div>
                    <div className="fw-bold">{videos.length}</div>
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
        )}
       {videos.length!=0 && <div className="row">
          {/* VIDEO PLAYER */}
          <div className="col-lg-8">
            <iframe
              className="w-100 rounded"
              height="350"
              src={`https://www.youtube.com/embed/${getYouTubeId(
                currentVideo?.youtube_url
              )}`}
              allowFullScreen
            />

            <h5 className="mt-3">{currentVideo?.title}</h5>
            <p>{currentVideo?.description}</p>

            {/* Navigation */}
          </div>

          {/* VIDEO LIST */}
          <div className="col-lg-4">
            <ul className="list-group">
              {videos.map((v, i) => (
                <li
                  key={i}
                  className={`list-group-item ${
                    i === currentIndex ? "active" : ""
                  }`}
                  style={{ cursor: "pointer" }}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}. {v.title}
                </li>
              ))}
            </ul>
          </div>
        </div>}
        {videos.length==0 && <div className="container my-5 text-center"> <h2>Videos Not Available</h2></div>}
      </div>
    </div>
  );
}

export default Videos;
