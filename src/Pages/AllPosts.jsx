import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { supabase } from "../client";


const AllPosts = (props) => {

    const [posts, setPosts] = useState([]); 
    useEffect(() => {
        setPosts(props.data);
    }, [props]);

    const mostUpvotes = () => {
        const sortedPost = [...posts.sort((x,y) => y.id - x.id)];
        setPosts(sortedPost); 
    };

    const mostDownvotes = () => {
        const sortedPost = [...posts.sort((x,y) => x.id - y.id)]; 
        setPosts(sortedPost);
    }; 

    const searchPost = (searchTerm) => {
        const searchedPost = props.data.filter(post => post.postTitle.toLowerCase().includes(searchTerm.toLowerCase()));
        setPosts(searchedPost); 
    };

    const onlyQuestions = () => {
        const onlyQuestionPost = props.data.filter(post => post.postType.includes("Question")); 
        setPosts(onlyQuestionPost); 
    };

    const onlyOpinions = () => {
        const onlyOpinion2 = props.data.filter(post => post.postType.includes("Opinion")); 
        setPosts(onlyOpinion2); 
    };


    const onlyRecs = () => {
        const onlyRecsPosts = props.data.filter(post => post.postType.includes("Recommendation"));
        setPosts(onlyRecsPosts); 
    }

    return (
        <div className="all-posts">
            <div className="filter-buttons">
                <input type="text" placeholder="Search Posts" onChange={(event) => searchPost(event.target.value)} />
                <button onClick={() => searchPost("")}>Clear Search</button>
                <button onClick={mostUpvotes}>Most Upvotes</button>
                <button onClick={mostDownvotes}>Most Downvotes</button>
                <button onClick={onlyQuestions}>Question</button>
                <button onClick={onlyOpinions}>Opinions</button>
                <button onClick={onlyRecs}>Recommendations</button>
            </div>
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