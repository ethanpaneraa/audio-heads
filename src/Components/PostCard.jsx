import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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



    return (
<div className="post-card">
        <div>
            <h2>{props.postTitle}</h2>
            <h4>Created: {props.postOrigin}</h4>
            <p>{props.postDesc}</p>
            <img src={props.postImage} alt="Image for this post" />
            <video width="540" height="275" controls preload="auto"> 
                <source src={props.postVideo}
                        type="video/mp4"/>
                <source src={props.postVideo}
                        type="video/ogg"/>
            </video>
            <div>
                <button className="upvote button" onClick={Upvote}>🔼</button>
                <h3>{upvotes}</h3>
                <button onClick={Downvote}>⬇️</button>
            </div>
        </div>
        <div>
            <form onSubmit={handleCommentSubmit}>
                <label>
                    Add a comment:
                    <input
                        type="text"
                        value={commentText}
                        onChange={handleCommentChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            <div>
                {comments2 && comments2.length > 0 ? (
                    comments2.map((comment, index) => (
                    <p key={index}>{comment}</p>
                ))
                ):
                (<h2>No comments</h2>)}
            </div>
        </div>
    </div>
    );
};

export default PostCard;
