import React from 'react';
import '../../assets/home.css'
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
      <div className="landing-page">
        <div className="landing-page-content">
          <h1 className="landing-page-title">Cloud Notes</h1>
          <p className="landing-page-description">Create, edit and collaborate on documents <br/>with ease</p>
          <Link to="/login" className="btn btn-outline-dark">Login</Link>
        </div>
      </div>
    );
}

export default LandingPage