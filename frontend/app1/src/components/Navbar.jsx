import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router"
import { toast } from 'react-toastify';
import { getUser } from "../services/userServices";

function Navbar() {
  const navigate=useNavigate();
  const [name,setName]=useState("")

  useEffect(()=>{
    getUserProfile()
  },[])
    const getUserProfile=async ()=>{
      const token=sessionStorage.getItem('token')
      const result=await getUser(token)

      if(result.status=="success"){
        setName(result.data.name)
      }
    }
  return (
      <nav className="navbar navbar-expand-lg navbar-primary bg-light shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand fw-bolder" >
          MyApp
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto gap-2">
            <li className="nav-item">
              <Link className="nav-link active" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">Profile</Link>
            </li>
          </ul>

          {/* Right Buttons */}
          <div className="d-flex align-items-center gap-3">
            <label style={{ marginRight: "20px" }} htmlFor="">Welcome🎉,  {"  "+name.split(" ")[0]}</label>
            <button className="btn btn-danger btn-md" onClick={e=>{navigate("/login");toast.success("Logout Successfully")}}>
              logout
            </button>
            
          </div>
        </div>

      </div>
    </nav>

  )
}

export default Navbar
