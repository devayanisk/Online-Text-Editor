import React, {useState} from 'react'
import axios from 'axios'
import "../../assets/auth.css"

const Login = () => {

    const [email, setEmail] = useState('jd@g.com');
    const [password, setPassword] = useState('12345678');

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = {
                    email: email,
                    password: password
                }
        console.log(data)

        try {
            const response = await axios.post("http://localhost:6001/api/auth/login", data);
            console.log(response);
            console.log(response.data.authToken)
            localStorage.setItem("authToken", response.data.authToken)

        } catch (error) {
            // check if error.response.data is array(validation error) or json(user existing error)
            console.log(error.response.data)
        }
        
    }


    const onChange = (e) =>{
        // const {name, value} = e.target;
        switch (e.target.name) {
            case 'email':
                setEmail(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
        console.log(email, password);
    }


    return (
        <>
            <div className="Auth-form-container container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <div className='text-align-center'>

                            <h3 className="Auth-form-title">Sign In</h3>
                        </div>
                        {/* <div className="text-center">
                            Not registered yet?{" "}
                            <span className="link-primary" onClick={changeAuthMode}>
                                Sign Up
                            </span>
                        </div> */}
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
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
                                placeholder="Enter password"
                                name='password'
                                value={password}
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
            </div>
        </>
    )
}

export default Login