import {React,useContext,useState} from 'react'
import Navbar from './../components/Navbar';
import { changePassword } from '../services/userServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { LoginContext } from '../App';
import AdminNavbar from '../components/AdminNavbar';

function ChangePassword() {
    const [newPassword,setNewPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const navigate=useNavigate()  
    const {role}=useContext(LoginContext)
    const resetPassword=async ()=>{
        if(newPassword.length==0){
          toast.warn("password is required")
          return
        }
        if(confirmPassword.length==0){
          toast.warn("confirm password is required")
          return
        }   
        const token=sessionStorage.getItem('token')
        const result=await changePassword(token,newPassword,confirmPassword)
        if(result.status=="success"){
          toast.success("password changed successfully")
          if(role=="admin"){
            navigate('/admin')
          }else{
navigate("/profile")
          }
          
        }
        else{
         toast.error("password change failed") 
        }
    }
  return (
    <div>
      {role=="admin" && <AdminNavbar />

    }
    {role=="student" && <Navbar/>}
      <div className='container my-5 '>
        <div className='card m-5'>

        
      <h1 className='text-center mt-5'>Change Password</h1>
              <div className='container'>
                <div className='mt-3 mb-3'>
                  
                </div>
                <div className='p-1 pl-5 ml-4 mr-5'>
                <div className='mb-3 '>
                      <input type="text" className="form-control" id="inputNewPassword" placeholder='Enter the new Password'  onChange={e => setNewPassword(e.target.value)} />
                    </div>
                    <div className='mb-3 '>
                      <input type="text" className="form-control" id="inputConfirmPassword" placeholder='Enter the confirm Password'  onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                </div>
                
                <div className='text-center mb-5'>
                    <button className="btn btn-primary btn-lg"  onClick={resetPassword}>Change Password</button>
                </div>
            </div>
            </div>
            </div>
    </div>
  )
}

export default ChangePassword
