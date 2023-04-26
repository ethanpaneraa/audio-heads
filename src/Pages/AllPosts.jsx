import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostCard from "../Components/PostCard";
import { supabase } from "../client"; 
import "../Styles/AllPosts.css"; 
import ReactPlayer from "react-player"; 

const AllPosts = (props) => {

    console.log("LOOK HERE:", props.data); 
    const [posts, setPosts] = useState([]); 
    useEffect(() => {
        setPosts(props.data);
    }, [props]);


    const mostUpvotes = () => {
        const sortedPost = [...posts.sort((x,y) => y.postUpvotes - x.postUpvotes)];
        setPosts(sortedPost); 
    };

    const mostDownvotes = () => {
        const sortedPost = [...posts.sort((x,y) => x.postUpvotes - y.postUpvotes)]; 
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
            <div className="search-bar">
                <h3>Search Post: </h3>
                <input type="text" placeholder="Post Title" onChange={(event) => searchPost(event.target.value)} />
                <button onClick={() => searchPost("")}>Clear Search</button>
            </div>
            <div className="filter-container">
                <div className="filter-buttons">
                    <h3>Order By: </h3>
                    <button onClick={mostUpvotes}>Most Upvotes</button>
                    <button onClick={mostDownvotes}>Most Downvotes</button>
                    <button onClick={onlyQuestions}>Question</button>
                    <button onClick={onlyOpinions}>Opinions</button>
                    <button onClick={onlyRecs}>Recommendations</button>
                </div>
            </div>
            <div className="post-container">
            {posts.length > 0 ? (
                posts.map((post, index) => 
                (<Link to={`/${post.id}`} key={index} >
                    <div className="small-post-container">
                        <div className="small-post-card" >
                            <div className="rating-buttons">
                                <button  type="submit">🔼</button>
                                <h4>{post.postUpvotes}</h4>
                                <button  type="submit">⬇️</button>
                            </div>

                            <div className="post-infoformation">
                                <h2>{post.postTitle}</h2>
                                <h4>ℹ️ : {post.postType}</h4>
                                <h4>{post.postDesc}</h4>
                            </div>
                            </div>
                            {post.postImage !== "" ? (
                            <div className="imgee">
                                <img src={post.postImage} />
                            </div>
                            ) : (
                            <div></div>
                            )}

                            {post.postVideo !== "" ? (
                            <div className="imgee">
                                <ReactPlayer 
                                url={post.postVideo}
                                width="100%"
                                height="500px"
                                controls
                                />
                            </div>
                            ) : (
                            <div></div>
                            )}
                    </div>
                </Link>
                ))
            ): (
                <h2 className="no-post">No Post Found!</h2>
            )}
            </div>
        </div>
    );
};

export default AllPosts; 