import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { authActions } from "../redux/store";
import { useDispatch } from 'react-redux';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //state
    const [inputs, setInputs] = useState({
        name: '',
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
            const { data } = await axios.post("/api/v1/user/register", { username: inputs.name, email: inputs.email, password: inputs.password });

            if (data.success) {
                dispatch(authActions.login());
                alert("User registered successfully");
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className="row w-100">
                    <div className="col-md-6 col-lg-4 mx-auto">
                        <div className="card shadow">
                            <div className="card-body">
                                <h1 className="card-title text-center mb-4">Register</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" name="name" value={inputs.name} onChange={handleChange} required />
                                    </div>
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
                                    <button type="submit" className="btn btn-white text-primary w-100" onClick={() => navigate('/login')}>Already registered? Please Login</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
