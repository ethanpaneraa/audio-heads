import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Navbar.css"; 


const Navbar = () => {


    return (
        <div className="nav-container">
            <div className="nav-bar2">
                <Link to="/" >
                    <div className="logo">
                        <h2>Audio Heads 🎧</h2>
                    </div>
                </Link>
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/new-posts">
                    <button>Create Post</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar; 