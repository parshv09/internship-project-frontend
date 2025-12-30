import { useState ,useContext} from "react";
import "../App.css";

import { loginUser } from "../services/userServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { LoginContext } from "../App";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loginStatus,setLoginStatus ,role, setRole}=useContext(LoginContext)
  const signin = async (e) => {
    if (email.length == 0) {
      toast.warn("email is required");
      return;
    }
    if (password.length == 0) {
      toast.warn("password is required");
      return;
    }
    const result = await loginUser(email, password);
    console.log(result);
    if (result.status == "success") {
      console.log(result.data)
      sessionStorage.setItem('token',result.data.token)
      setLoginStatus(true)
      if(result.data.role=="student"){
              setRole(result.data.role)
              console.log(loginStatus)
              toast.success("login successful");
              navigate("/home");
      }
      if(result.data.role=="admin"){
        setRole(result.data.role)
              console.log(loginStatus)
              toast.success("login successful");
              navigate("/admin");
      }
    } else {
      toast.error("login failed");
    }
  };
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 my-5 pt-5">
      <div className="border p-4 rounded w-25 shadow bg-white ">
         <div className="icon-circle-lg bg-primary-light mb-3 mx-auto">
             <i className="fa-solid fa-user" style={{color:"##3a0ca3"}}></i>
            </div>
        <h3 className="text-center mb-4">Login</h3>

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

        <div className="mb-3">
           <div className="input-group">
              <span className="input-group-text bg-light border-end-0">
                <i className="bi bi-lock-fill" style={{color:"blue"}}></i>
              </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => {
            setPassword(e.target.value);
            }}
          />
         </div>
        </div>

        <button className="btn btn-primary w-100" onClick={signin}>
          Login
        </button>


      </div>
    </div>
  );
}

export default Login;
