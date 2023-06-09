import React from "react";
import { useState } from "react";
import "../Styles/Post.css"; 
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import PostCard from "../Components/PostCard";
const Post = ({ data }) => {

    const { id } = useParams(); 
    console.log("data", data); 
    const [post, setPost] = useState(data.filter((post2) => post2.id === parseInt(id))[0]);
    console.log("post", post); 
    
    const removePost = async (event) => {
        event.preventDefault();

        await supabase
            .from("audio-heads")
            .delete()
            .eq("id", id);

        window.location = "/"; 
    };

    return (
        <div>
            <PostCard 
                postID={post.id}
                postTitle={post.postTitle}
                postImage={post.postImage}
                postDesc={post.postDesc}
                postUpvotes={post.postUpvotes}
                postDownvotes={post.postDownvotes}
                postOrigin={post.created_at}
                postComments={post.comments}
                postVideo={post.postVideo}
                postType={post.postType}
            />
        </div>
    );
};

export default Post; 