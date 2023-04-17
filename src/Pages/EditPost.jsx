import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/EditPost.css"; 
import { supabase } from "../client";
const EditPost = ({ data }) => {

    const { id } = useParams(); 
    const [post, setPost] = useState(data.filter((post2) => post2.id === parseInt(id))[0]);

    const updatePost = async (event) => {
        event.preventDefault(); 

        await supabase
            .from("audio-heads")
            .update({
                postTitle: post.postTitle,
                postDesc: post.postDesc,
                postImage: post.postImage
            })
            .eq("id", id); 

        window.location = "/"; 
    };

    const removePost = async (event) => {
        event.preventDefault(); 

        await supabase
        .from("audio-heads")
        .delete()
        .eq("id", id)

        window.location = "/"; 
    };

    const onChange = (event) => {
        setPost((prevPost) => {
            return { ...prevPost, [event.target.name]: event.target.value };
        });
    };
    

    return (
        <div>
            <form onSubmit={updatePost}>
            <label htmlFor="postTitle">Title</label> <br />
            <input 
                type="text" 
                id="postTitle" 
                name="postTitle" 
                value={post.postTitle} 
                onChange={onChange} />
            <label htmlFor="postImage">Image URL</label>
            <input 
                type="text" 
                id="postImage" 
                name="postImage" 
                value={post.postImage} 
                onChange={onChange}/>
            <label htmlFor="postDesc">Description</label>
            <textarea
                rows="5"
                cols="50"
                id="postDesc"
                value={post.postDesc}
                name="postDesc"
                onChange={onChange}
            />
            <input type="submit" value="Update" />
            <button className="deleteButton" onClick={removePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost; 