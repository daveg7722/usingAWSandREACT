import React, {useEffect, useState} from 'react'
import { API, graphqlOperation } from 'aws-amplify';
import { getPost } from '../graphql/queries';
import { onCreateComment, onUpdatePost, onUpdateComment, onDeleteComment } from '../graphql/subscriptions';

import DeletePost from './DeletePost'
import CreateCommentPost from './CreateCommentPost'
import CommentPost from './CommentPost'
import EditPost from './EditPost'

import {useParams, useHistory} from 'react-router-dom'

import * as classes from '../css/DisplayPost.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

let updatePostListener, createPostCommentListener, updateCommentListener, deleteCommentListener;

const DisplayPost = ({selectedPost}) => {
    const [post, setPost] = useState(null);
    const {id} = useParams();  
    const history = useHistory();
    useEffect(()=> {
        const body = document.querySelector("body");
        body.className = classes.body;

        if(!selectedPost){
            (async () => {            
                await API.graphql(graphqlOperation(getPost, {id})).then(res => {
                    setPost(()=> res.data.getPost);
                });
            })();
        }

        

        updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
            .subscribe({
                next: postData => {
                    const updatedPost = postData.value.data.onUpdatePost;
                    setPost(p => {
                        return updatedPost;
                    });
                }
            });

        createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
            .subscribe({
                next: commentData => {
                    const comment = commentData.value.data.onCreateComment;
                    setPost(p => {
                        const prevComments = [...p.comments.items];
                        const updatedComments = prevComments.filter(prevCom => prevCom.id !== comment.id)
                        const updatedPost = {...p};
                        updatedPost.comments.items = [comment, ...updatedComments];
                        return updatedPost;
                    });
                }
            });  

        updateCommentListener = API.graphql(graphqlOperation(onUpdateComment))
            .subscribe({
                next: commentData => {
                    const comment = commentData.value.data.onUpdateComment;
                    setPost(p => {
                        const prevComments = [...p.comments.items];
                        const updatedComments = prevComments.filter(prevCom => prevCom.id !== comment.id)
                        const updatedPost = {...p};
                        updatedPost.comments.items = [comment, ...updatedComments];
                        return updatedPost;
                    });
                }

            });
        
        deleteCommentListener = API.graphql(graphqlOperation(onDeleteComment))
            .subscribe({
                next: commentData => {
                    const comment = commentData.value.data.onDeleteComment;
                    setPost(p => {         
                        const prevComments = [...p.comments.items];
                        const updatedPost = {...p}; //copy entire post                     
                        updatedPost.comments.items.length = [];
                        const updatedComments = prevComments.filter(prevCom => prevCom.id !== comment.id);  
                        updatedPost.comments.items = [...updatedComments];
                        return updatedPost;
                    });
                }
            });
            
            return () => {
                body.classList.remove(classes.body);
                updatePostListener.unsubscribe();
                createPostCommentListener.unsubscribe();
                updateCommentListener.unsubscribe();
                deleteCommentListener.unsubscribe();
            }
    }, [selectedPost, id]);

    if(!selectedPost && !post) {
        return <p>...loading</p>;
    }
    else if(!post){
        setPost(()=> selectedPost)
        return <p>...loading</p>;
    } else if (post) {
        return (
            <div className={classes.container}>
                <div className={classes.post}>
                    <div style={{display:'flex', flexDirection: 'row', justifyContent:'space-between', alignItems:'center', marginTop:'4vh'}}>
                        <FontAwesomeIcon icon={faChevronLeft}  onClick={() => history.goBack()}
                        style={{backgroundColor:'white', color:'gray', fontSize: '3em', textAlign:'center', borderRadius:'8px'}}/>
                        <span><DeletePost postId={post.id}/> <EditPost post={post}/></span>
                    </div>          
                    <div style={{backgroundColor:'rgba(0, 0, 0, 0.70)', borderRadius:'5px', marginTop: '5vh', width: '90%'}}>
                        <div style={{backgroundColor:'rgb(255, 255, 255)', border:'1px solid black', borderRadius:'5px', padding: '2vh 2vw', position: 'relative', left:'1vw', bottom: '1vh'}}> 
                            <h2 style={{marginLeft:'auto', marginRight:'auto', width:'100%'}}>{post.postTitle}</h2>
                        
                            <p>{post.postBody}</p>
                            <p> - {post.postOwnerUsername} at {new Date(post.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <div><FontAwesomeIcon icon={faCheckDouble} style={{marginTop:'2vh', backgroundColor:'white', color:'black', borderRadius: "5px", fontSize:'2em'}}/></div>
                    <div style={{position:'relative'}}><CreateCommentPost postId={post.id}/></div>
                </div>
                <div className={classes.comments}>
                {
                    post.comments.items.length > 0 && post.comments.items.map(comment => {          
                        return (
                            <CommentPost key={comment.id} comment={comment} />
                        );
                    })
                }
                </div>
            </div>    
        ); 
    }   
}

export default DisplayPost;