import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player"; 
import "../Styles/PostCard.css"

const PostCard = (props) => {
    console.log(props); 
    const { id } = useParams();
    const [upvotes, setUpvotes] = useState(props.postUpvotes);
    const [comments2, setComments] = useState(props.postComments || []);
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        setComments(props.postComments);
        console.log("comments:", comments2); 
    }, [props.postComments]);


    const Upvote = async (event) => { 

        event.preventDefault(); 
        const resultUpvote = await supabase
        .from("audio-heads")
        .update({ postUpvotes: parseInt(upvotes + 1 )})
        .eq("id", id)
        .select()
        setUpvotes(resultUpvote.data[0].postUpvotes); 

        console.log("props:", props); 

    }


    const Downvote = async (event) => {

        event.preventDefault(); 

        const { data: postData, error } = await supabase
            .from("audio-heads")
            .select("downvoted")
            .eq("id", id);
    
        if (error) {
        console.log(error);
        return;
        }
    
        const userHasDownvoted = postData[0]?.downvoted || false; // Check if user has already downvoted
    
        if (!userHasDownvoted) {
            const { data: downvoteData, error: downvoteError } = await supabase
            .from("audio-heads")
            .update({
                postDownvotes: parseInt(upvotes - 1),
                downvoted: true,
            })
            .eq("id", id)
            .select("postDownvotes");
            
        if (downvoteError) {
            console.log(downvoteError);
            return;
        }

        setUpvotes(downvoteData[0].postDownvotes);
        } else {
        alert("You've already downvoted this post, you cannot downvote again.");
        }
        };

        const handleCommentChange = (event) => {
            setCommentText(event.target.value);
        };
        
        const handleCommentSubmit = async (event) => {
            event.preventDefault();
            if (commentText.trim() === "") {
                return;
            }


            const updatedComments = Array.isArray(comments2) ? [...comments2, commentText] : [commentText];

            console.log("comments2:", comments2);
            const { error } = await supabase
                .from("audio-heads")
                .update({ comments: updatedComments })
                .eq("id", id)
                .select("comments");

            if (error) {
                console.log(error);
                return;
            }
            setComments(updatedComments);
            setCommentText("");
        };

        const removePost = async (event) => {
            event.preventDefault();
    
            await supabase
                .from("audio-heads")
                .delete()
                .eq("id", id);
    
            window.location = "/"; 
        };



    return (
        <div className="post-card">
            <div className="post-info2">
                <div className="postcard-information">
                    <div className="post-voting-buttons">
                            <button className="upvote-button" onClick={Upvote}>🔼</button>
                            <h3>{upvotes}</h3>
                            <button onClick={Downvote}>⬇️</button>
                    </div>
                    <div className="post-text">
                        <h2>{props.postTitle}</h2>
                        <h4 className="post-label">{props.postType}</h4>
                        <h5>Posted: {props.postOrigin}</h5>
                        <h4>What this user says:</h4>
                        <p>{props.postDesc}</p>
                    </div>
                </div>

                {props.postVideo !== "" ? (
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
                <div className="post-controlers">
                    <button><Link to={`/edit-post/${props.postID}`}>Update Post</Link></button>
                    <button onClick={removePost}>Delete Post</button>
                </div>

                {props.postImage !== "" ? (
                    <img src={props.postImage} alt="Image for this post"/>
                ):
                <div></div>}
                <form onSubmit={handleCommentSubmit}>
                        <input
                            type="text"
                            value={commentText}
                            onChange={handleCommentChange}
                            placeholder="Comment your thoughts"
                        />
                    <button type="submit">Comment</button>
                </form>
                <div>
                    {comments2 && comments2.length > 0 ? (
                        comments2.map((comment, index) => (
                        <p key={index}>Comment {index + 1}: {comment}</p>
                    ))
                    ):
                    (
                        <div></div>
                    )}
                </div>

            </div>
                
    </div>
    );
};

export default PostCard;
