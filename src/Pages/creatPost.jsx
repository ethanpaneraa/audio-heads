import React from "react";
import { useState } from "react";
import { supabase } from "../client";
import "../Styles/CreatePosts.css"; 
const CreatePost = () => {
    
    const [post, setPost] = useState({postTitle : "", postDesc : "", postImage : "", postPassword : ""});

    const makePost = async (event) => {
        event.preventDefault(); 

        await supabase
        .from("audio-heads")
        .insert({
        postTitle: post.title || "title",
        postDesc: post.description || "description",
        postImage: post.Image || "",
        postUpvotes: 0,
        postPassword: post.postPassword || "",
        postType : post.postType || "",
        postVideo: post.postVideo || ""
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
            <div className="post-container">
                <h2>Create a New Post</h2>
                <form onSubmit={makePost}>
                    <label htmlFor="title">Title: </label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={onChange}
                    />
                    <label htmlFor="postType">Post Type: </label>
                    <select id="postType" name="postType" value={post.postType} onChange={onChange}>
                        <option value="Questin">Question</option>
                        <option value="Recommendation">Recommendation</option>
                        <option value="Opinion">Opinion</option>
                    </select>
                    <label htmlFor="Image">Image Link (opitonal): </label>
                    <input 
                    type="text"
                    id="Image"
                    name="Image"
                    value={post.Image}
                    onChange={onChange}
                    />
                    <label htmlFor="postVideo">Video Link (opitonal): </label>
                    <input
                    type="text"
                    id="postVideo"
                    name="postVideo"
                    value={post.postVideo}
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
                    <label htmlFor="postPassword">Post Key: </label>
                    <input 
                    type="text"
                    id="postPassword"
                    name="postPassword"
                    value={post.postPassword}
                    onChange={onChange}
                    />
                    <input type="submit" value="Publish Post" className="submit-button"/>
                </form>
            </div>
        </div>
    );
};

export default CreatePost; 