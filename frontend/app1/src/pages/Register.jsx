import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "../services/userServices";
import { useNavigate, useParams } from "react-router";
import { getCourseDetails } from "../services/courseServices";
import { LoginContext } from "../App";
import "../assets/register.css"
function Register() {
  const { courseId } = useParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const {loginStatus,setLoginStatus,role}=useContext(LoginContext)
  const navigate = useNavigate();
  const [courses,setCourses]=useState([])
  useEffect(()=>{getCourse()},[])

  const getCourse=async ()=>{
    const result=await getCourseDetails(courseId)
    if(result.status=="success"){
      console.log(result.data)
      setCourses(result.data[0])
    }
  }

  const signup = async (e) => {
    if (name.length == 0) {
      toast.warn("name is required", { theme: "colored" });
      return;
    }
    if (email.length == 0) {
      toast.warn("email is required");
      return;
    }
    if (phone.length == 0) {
      toast.warn("phone is required");
      return;
    }
    const result = await registerUser(courseId, name, email, phone);
    console.log(result);
    if (result.status == "success") {
      toast.success("registration successful");
      if(loginStatus){
        navigate('/course')
      }else{
         navigate("/login");
      }
     
    } else {
      toast.error("registration failed");
    }
  };
  return (
<div className="course-detail-page">
     <div className="container ml-5"> <button 
      className="enroll-button" 
      onClick={() => navigate(-1)}
    >
      <i className="fas fa-arrow-left"></i> Back
    </button></div>
  <div className="text-center mb-5">
    <h2 className="course-title fw-bold text-gradient">{courses.course_name}</h2>
   {role!="admin" && <p className="text-muted">Complete your enrollment to get started</p> }
  </div>

  <div className="row justify-content-center mb-5">
    <div className="col-md-10">
      <div className="row g-4">
        <div className="col-md-6">
          <div className="course-info-card card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-primary-light me-3">
                  <i className="fas fa-calendar-alt text-primary"></i>
                </div>
                <h5 className="mb-0 fw-bold">Course Schedule</h5>
              </div>
              <div className="info-grid">
                <div className="info-item">
                  <i className="far fa-calendar-check text-primary me-2"></i>
                  <span className="text-muted">Start Date:</span>
                  <span className="fw-medium ms-2">{courses.start_date?.split("T")[0].split("-").reverse().join("-")}</span>
                </div>
                <div className="info-item">
                  <i className="far fa-calendar-times text-primary me-2"></i>
                  <span className="text-muted">End Date:</span>
                  <span className="fw-medium ms-2">{courses.end_date?.split("T")[0].split("-").reverse().join("-")}</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-rupee-sign text-primary me-2"></i>
                  <span className="text-muted">Course Fees:</span>
                  <span className="fw-bold text-primary ms-2">Rs. {courses.fees}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="course-desc-card card border-0 shadow-lg h-100">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="icon-circle bg-info-light me-3">
                  <i className="fas fa-info-circle text-info"></i>
                </div>
                <h5 className="mb-0 fw-bold">Course Details</h5>
              </div>
              <div className="course-description">
                <i className="fas fa-book-reader text-info me-2"></i>
                <p className="mb-0">{courses.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 {role!="admin" && <div className="row justify-content-center">
    <div className="col-lg-8 col-xl-6">
      <div className="registration-card card border-0 shadow-lg">
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <div className="icon-circle-lg bg-primary-light mb-3 mx-auto">
              <i className="fas fa-user-plus text-primary"></i>
            </div>
            <h3 className="fw-bold mb-2">Register for Course</h3>
            <p className="text-muted">Fill in your details to enroll</p>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-user text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-3"
                placeholder="Enter Your Full Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-envelope text-primary"></i>
              </span>
              <input
                type="email"
                className="form-control border-start-0 ps-3"
                placeholder="Enter Your Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="fas fa-phone text-primary"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-3"
                maxLength={10}
                placeholder="Enter Your Mobile Number"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 py-3 fw-bold" onClick={signup}>
            <i className="fas fa-check-circle me-2"></i>
            Complete Registration
          </button>

            {!loginStatus &&
            <div className="text-center mt-4 pt-3 border-top">
            <p className="text-muted mb-2">
             
              Already have an account?
            </p>
            <a href="/" className="btn btn-outline-primary">
              <i className="fas fa-arrow-right-to-bracket me-2"></i>
              Login Here
            </a>
          </div>
            }
          
        </div>
      </div>
    </div>
  </div> }
</div>
  );
}

export default Register;
