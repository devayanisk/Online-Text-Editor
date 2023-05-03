import React, {useState, useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    const [log, setLog] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setLog(false);
    };
    

    useEffect(() => {
        if (localStorage.getItem('authToken')){
          setLog(true);
        } else {
          setLog(false);
        }
      }, [localStorage.getItem('authToken')]);
      

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="#">Cloud Notes</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} to="/">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/notes"? "active": ""}`} to="/notes">Notes</Link>
                        </li>
                        

                        <li className='nav-item'>
                        {log ? (
                        <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login" onClick={handleLogout}>
                            Logout
                        </Link>
                        ) : (
                            <Link className={`nav-link ${location.pathname === "/login" ? "active" : ""}`} to="/login">
                            Login
                            </Link>
                        )}
                        </li>

                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar