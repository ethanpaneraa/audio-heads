import React from "react";
import { useState } from "react";
import { supabase } from "../client";
import "../Styles/CreatePosts.css"; 
const CreatePost = () => {

    const [post, setPost] = useState({postTitle : "", postDesc : "", postImage : ""});

    const makePost = async (event) => {
        event.preventDefault(); 

        await supabase
        .from("audio-heads")
        .insert({
        postTitle: post.title || "title",
        postDesc: post.description || "description",
        postImage: post.Image || "",
        postUpvotes: 0
        })
        .select();

    window.location = "/";
    };

    const onChange = (event) => {
        setPost((prevPost) => {
            return { ...prevPost, [event.target.name]: event.target.value };
        });
    };


    return (
        <div className="creat-posts">
            <form onSubmit={makePost}>
                <label htmlFor="title">Title: </label>
                <input
                type="text"
                id="title"
                name="title"
                value={post.title}
                onChange={onChange}
                />
                <label htmlFor="Image">Image: </label>
                <input 
                type="text"
                id="Image"
                name="Image"
                value={post.Image}
                onChange={onChange}
                />
                <label htmlFor="desc">Descripition: </label>
                <textarea
                rows="5"
                cols="50"
                id="description"
                name="description"
                value={post.description}
                onChange={onChange}
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default CreatePost; 