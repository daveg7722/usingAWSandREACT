import React, { useEffect, useState, useRef, useCallback } from 'react';
import { listPosts, postByUsername } from '../graphql/queries';
import { onCreateComment, onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions';
import { API, graphqlOperation, Storage } from 'aws-amplify';

import {connect} from 'react-redux';

import PostDescription from './PostDescription'
import DisplayPost from './DisplayPost'
import CreatePost from './CreatePost';
import SearchPosts from './SearchPosts';

import * as classes from '../css/DisplayPosts.module.css';

import {Route, useRouteMatch, Switch, useLocation } from 'react-router-dom'

let createPostListener, deletePostListener, updatePostListener, createPostCommentListener;

const DisplayPosts = (props) => {
    const {path, url} = useRouteMatch();
    const {pathname} = useLocation();
    const isMounted = useRef(false);
    const [posts, setPosts] = useState([]);
    const [activePost, setActivePost] = useState(null)
    const {query, sortBy, filter} = props; 
    
    useEffect(()=> {
        if(isMounted.current) {
            switch (sortBy){
                case 'postTitle':
                    (async () => {            
                        await API.graphql(graphqlOperation(listPosts, {limit: 10, filter: { /*postTitle*/ [sortBy]: {contains: query}}})).then(res => {
                            //console.log(res.data.listPosts.items);
                            setPosts(()=> [...res.data.listPosts.items]);
                        });
                    })();
                    break;
                case 'postOwnerUsername':
                    (async () => {            
                        await API.graphql(graphqlOperation(postByUsername, {/*postOwnerUsername*/[sortBy]: query, postTitle: {beginsWith: filter}, sortDirection: 'ASC'/*, filter: {postBody: {contains: "first"}}*/} )).then(res => {
                            console.log(res.data.postByUsername);
                            const posts = [...res.data.postByUsername.items];
                            //const filteredPosts = posts.filter(p => p.postTitle.includes("Ba"));
                            //console.log("Filtered posts "+ filteredPosts);
                            //setPosts(()=> [...filteredPosts]);
                            setPosts(()=> [...posts])
                        });
                    })();
                    break;
                default: break;
            }
            
        }
    }, [query, sortBy, filter]);
    useEffect(() => {
        if(pathname === "/") {
            (async () => {            
                await API.graphql(graphqlOperation(listPosts)).then(res => {
                    console.log(res.data.listPosts.items);
                    setPosts(()=> [...res.data.listPosts.items]);
                });
            })();
            createPostListener = API.graphql(graphqlOperation(onCreatePost))
                .subscribe({
                    next: postData => {
                        const newPost = postData.value.data.onCreatePost;
                        setPosts(p => {
                            const prevPosts = [...p];
                            const updatedPosts = prevPosts.filter(post => post.id !== postData.id);
                            return [newPost, ...updatedPosts]
                        });    
                    }
                });
            
            deletePostListener = API.graphql(graphqlOperation(onDeletePost))
                .subscribe({
                    next: postData => {
                        const deletedPost = postData.value.data.onDeletePost;
                        setPosts(p => {
                            const remainingPosts = p.filter(post => post.id !== deletedPost.id);
                            return remainingPosts;
                        });
                    }
                });

            updatePostListener = API.graphql(graphqlOperation(onUpdatePost))
                .subscribe({
                    next: postData => {
                        const updatedPost = postData.value.data.onUpdatePost;
                        setPosts(p => {
                            const posts = p.filter(post => post.id !== updatedPost.id);
                            return [updatedPost, ...posts];
                        });
                    }
                });

            createPostCommentListener = API.graphql(graphqlOperation(onCreateComment))
                .subscribe({
                    next: commentData => {
                        const comment = commentData.value.data.onCreateComment;
                        setPosts(p => {
                            //const index = p.findIndex(post => post.id === comment.postId);
                            const post = p.find(post => post.id === comment.postId);
                            post.comments.items.push(comment);
                            const posts = p.filter(post => post.id !== comment.postId);
                            posts.push(post);
                            return posts;
                        });
                    }
                });           
            isMounted.current = true;
            return () => {
                createPostListener.unsubscribe();
                deletePostListener.unsubscribe();
                updatePostListener.unsubscribe();
                createPostCommentListener.unsubscribe();
            }
        }
    }, [pathname]);

    

    


    let loadedPosts = posts.map((post) => {
        return (
            <div className={classes.post} style={{padding: '20px'}} key={post.id} onClick={()=> setActivePost(post)}>
                <PostDescription post={post} />                
            </div>
        );
    });

    if(pathname === "/"){
        return(
            <>
                <SearchPosts viewWidth={props.viewWidth}/>
                <CreatePost />
                <h1 className={classes.header}>Posts From Database</h1>
                <div className={classes.posts}>                            
                    {loadedPosts}
                </div>
            </>
        )
    }

    return (
        <> 
            <Switch>   
                <Route path={`${path}post/:id`}>                
                    <DisplayPost selectedPost={activePost} />
                </Route>  
            </Switch> 
        </>
    );
}

const fromState = state => {
    return {
        query: state.search.query,
        sortBy: state.search.sortBy,
        filter: state.search.filter
    };
};
export default connect(fromState)(DisplayPosts);
