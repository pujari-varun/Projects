import React, { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const  navigate=useNavigate();
    const handlelogout=()=>{
        localStorage.removeItem('user');
        console.log('User logged out');
        navigate('/login');
    }
    const [loggedInUser,setloggedInUser]=useState('');
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem('user'));
        if(user){
            setloggedInUser(user);
        }
    },[]);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link className="navbar-brand" to="/">EMS</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {/* <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">{loggedInUser && loggedInUser.name}</Link>
                            </li>
                            <li>
                                <button className="btn btn-outline-danger" type="submit" onClick={handlelogout}>Logout</button>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
