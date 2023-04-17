import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {


    return (
        <div className="nav-bar">
            <h2>Audio Heads 🎧</h2>
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/new-posts">
                <button>Create Post</button>
            </Link>
        </div>
    );
};

export default Navbar; 