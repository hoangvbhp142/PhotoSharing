import React, { useState } from 'react'
import './LoginRegister.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginRegister = ({setIsLogin}) => {

    let url = "http://localhost:8081/";

    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        location: "",
        description: "",
        occupation: "",
    });
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((data) => ({...data, [name]: value}));
    }

    const login = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(state === "Login"){
            newUrl += "api/user/login";
        }
        else{
            newUrl += "api/user/register";
        }
        const response = await axios.post(newUrl, formData);

        if(response.data.success){
            localStorage.setItem("token", response.data.token);
            navigate("/");
            setIsLogin(true);
        }
        else{
            console.log(response.data.message);
            alert(response.data.message);
        }
    }

  return (
    <div>
      <form onSubmit={login} action="">
        <div className="title">
            <h2>{state}</h2>
        </div>
        <div className="input">
            <input onChange={onHandleChange} name='username' value={formData.username} type="text" placeholder='Username'/>
            <input onChange={onHandleChange} name='password' value={formData.password} type="password" placeholder='Password'/>
            {state === 'SignUp' ? (
                <>
                    <input onChange={onHandleChange} name='first_name' value={formData.first_name} type="text" placeholder="Firstname" />
                    <input onChange={onHandleChange} name='last_name' value={formData.last_name} type="text" placeholder="Lastname" />
                    <input onChange={onHandleChange} name='location' value={formData.location} type="text" placeholder="Location" />
                    <input onChange={onHandleChange} name='description' value={formData.description} type="text" placeholder="Description" />
                    <input onChange={onHandleChange} name='occupation' value={formData.occupation} type="text" placeholder="Occupation" />
                </>
                ) : (
                <></>
            )}
        </div>
        <button type='submit'>{state}</button>
        {
            state === "Login"
            ?<p>Create an account! <span onClick={() => setState("SignUp")}>Click here</span></p>
            :<p>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginRegister
