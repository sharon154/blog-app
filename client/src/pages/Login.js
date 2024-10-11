import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from "../redux/store";
import { useDispatch } from 'react-redux';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //state
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })
    //handle change
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(inputs)
        try {
            const { data } = await axios.post("/api/v1/user/login", { email: inputs.email, password: inputs.password });

            if (data.success) {
                dispatch(authActions.login());
                alert("User logged in successfully");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <>
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="row w-100">
                        <div className="col-md-6 col-lg-4 mx-auto">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h1 className="card-title text-center mb-4">Login</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="email" name="email" value={inputs.email} onChange={handleChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" value={inputs.password} onChange={handleChange} autoComplete='password' required />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                                    </form>
                                    <div className="text-center mt-3">
                                        <button type="submit" className="btn btn-white text-primary w-100" onClick={() => navigate('/register')}>Don't have an account? Please Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        </div>
    )
}

export default Login
