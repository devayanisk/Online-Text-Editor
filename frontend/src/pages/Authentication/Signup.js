import React, {useState} from 'react'
import axios from 'axios'
import "../../assets/auth.css"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {

    const [name, setName] = useState('Jane Doe');
    const [email, setEmail] = useState('jd@g.com');
    const [password, setPassword] = useState('12345678');
    const [confirmPassword, setConfirmPassword] = useState('12345678');
    const navigate = useNavigate();

    // Get data before submitting
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (confirmPassword !== password){
            alert("Passwords do not match");
            return;
        }
        let data = {name: name,
                    email: email,
                    password: password
                }
        console.log(data)

        try {
            const response = await axios.post("http://localhost:6001/api/auth/create-user", data);
            console.log(response);
            console.log(response.data.authToken)
            localStorage.setItem("authToken", response.data.authToken)
            navigate("/notes");

        } catch (error) {
            // check if error.response.data is array(validation error) or json(user existing error)
            console.log(error.response.data)
            toast.error('User already exists', {
                position: "top-center",
                autoClose: false,
                closeOnClick: true,
            });
        }
        
    }

    const onChange = (e) =>{
        // const {name, value} = e.target;
        switch (e.target.name) {
            case 'name':
                setName(e.target.value);
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
            default:
                break;
        }
        console.log(name, email, password, confirmPassword);
    }

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign Up</h3>
                    {/* <div className="text-center">
                        Already registered?{" "}
                        <span className="link-primary" onClick={changeAuthMode}>
                            Sign In
                        </span>
                    </div> */}
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            name='name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name='email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name='password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Confirm Password"
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={onChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                    {/* <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </div>
            </form>
            <ToastContainer />
        </div>
    )

}

export default Signup