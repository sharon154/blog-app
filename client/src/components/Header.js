import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from "../redux/store";

const Header = () => {
    //global state
    const isLogin = useSelector(state => state.isLogin);

    //console.log(isLogin);
    const [value, setValue] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            alert("Logged out successfully");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fs-5">
                <div className="container-fluid mx-5">
                    <a className="navbar-brand" href="/">Blog App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {isLogin && (
                            <div className='ms-auto'>
                                <ul className="navbar-nav nav-item" value={value} onChange={(e, val) => setValue(val)}>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href="/blogs">All Blogs</a>
                                    </li>
                                    <li className="nav-item mx-2">
                                        <a className="nav-link" href="/my-blogs">My Blogs</a>
                                    </li>
                                </ul>
                            </div>

                        )}
                        <div className='ms-auto'>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item mx-2">
                                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                                </li>
                                {!isLogin && (
                                    <>
                                        <li className="nav-item mx-2">
                                            <button className="nav-link" href="/login">Login</button>
                                        </li>
                                        <li className="nav-item mx-2">
                                            <button className="nav-link" href="/register">Register</button>
                                        </li>
                                    </>
                                )}
                                {isLogin && (
                                    <>
                                        <li className="nav-item mx-2">
                                            <button onClick={handleLogout} className="nav-link" href="/register">Logout</button>
                                        </li>
                                    </>
                                )}
                            </ul>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
