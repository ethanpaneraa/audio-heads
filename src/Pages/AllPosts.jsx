import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";


const AllPosts = (props) => {

    const [posts, setPosts] = useState([]); 
    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    return (
        <div className="all-posts">
            {posts && posts.length > 0 ? (
                posts.map((post, index) => 
                (<Link to={`/${post.id}`} key={index}>
                    <PostCard 
                        postID={post.id}
                        postTitle={post.postTitle}
                        postImage={post.postImage}
                        postDesc={post.postDesc}
                        postUpvotes={post.postUpvotes}
                        postDownvotes={post.postDownvotes}
                        postOrigin={post.created_at}
                        postComments={post.comments}
                    /> 
                </Link>
                ))
            ): (
                <h2>No Post Found</h2>
            )}
        </div>
    );
};

export default AllPosts; 