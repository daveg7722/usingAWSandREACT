import { API, graphqlOperation, Auth} from 'aws-amplify';
import { createPost } from '../graphql/mutations';
import React, {useState, useEffect} from 'react';

import * as classes from '../css/CreatePost.module.css'


const CreatePost = (props) => {

    const [post, setPost] = useState({
        postOwnerId: "",
        postOwnerUsername: "",
        postTitle:"",
        postBody:""
    });

    useEffect(()=> {
        (async () => {
            await Auth.currentUserInfo().then(user => {
                if (user) {
                    let temp = {
                        postOwnerId: user.attributes.sub,
                        postOwnerUsername: user.username
                    }
                    setPost(p => {
                        return {
                            ...p, ...temp
                        }})
            }})            
        })();
    }, []);


    const handleChangePost = event => {
        setPost({
            ...post,
            [event.target.name] : event.target.value
        })
    }

    const handleAddPost = async (event) => {
        event.preventDefault();

        const input = {
            postOwnerId: post.postOwnerId,
            postOwnerUsername: post.postOwnerUsername,
            postTitle: post.postTitle,
            postBody: post.postBody,

            createdAt: new Date().toISOString()
        }
        console.log(JSON.stringify(input));
        await API.graphql(graphqlOperation(createPost, {input}));

        setPost({
            ...post,
            postTitle:"",
            postBody:""});

    };

    return (
        <div className={classes.container}>
            <form onSubmit={handleAddPost} style={{padding: '1vw 1vh'}}>
                <input className={classes.title}
                    type="text" placeholder="Title"
                    name="postTitle"
                    required
                    autoComplete="off"
                    value={post.postTitle}
                    onChange={handleChangePost}/>
                <textarea
                    className={classes.content}
                    type="text"
                    name="postBody"
                    rows="1"
                    cols="1"
                    required
                    placeholder="New Blog Post"
                    value={post.postBody}
                    onChange={handleChangePost}/>
                <input 
                    type="submit"
                    className={classes.submit}
                    style={{fontsize: '19px'}}/>
            </form>
        </div>
    );
};

export default CreatePost;