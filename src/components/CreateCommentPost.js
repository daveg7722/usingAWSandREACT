import { API, Auth, graphqlOperation} from 'aws-amplify';
import React, {useState, useEffect} from 'react';
import { createComment } from '../graphql/mutations';

import * as classes from '../css/CreateCommentPost.module.css'

const CreateCommentPost = props => {

    const [comment, setComment] = useState({content: ""});

    useEffect(() => {
        (async() => {
            await Auth.currentUserInfo()
                .then(user => {
                    if(user) {
                    setComment(comment => {
                        return {
                            ...comment,
                            commentOwnerId: user.attributes.sub,
                            commentOwnerUsername: user.username
                        }
                    });
                }})
        })();
    }, []);

    const changeContentHandler = event => {
        const content = event.target.value;
        setComment(comment => {
            return {
                ...comment,
                content
            }
        });
    };

    const addCommenthandler = async (event) => {
        event.preventDefault();
        const input = {
            postId: props.postId,
            commentOwnerId: comment.commentOwnerId,
            commentOwnerUsername: comment.commentOwnerUsername,
            content: comment.content,
            createdAt: new Date().toISOString()
        }
        await API.graphql(graphqlOperation(createComment, {input}));

        setComment(comment => {
            return {
                ...comment,
                content: ""
            }
        });
    };

    return (
        <div>
            <form onSubmit={addCommenthandler}>
                <textarea
                    className={classes.content}
                    type="text"
                    name="content"
                    rows="2"
                    cols="40"
                    style={{marginTop:'2vh'}}
                    required
                    placeholder="add Your Comment"
                    value={comment.content}
                    onChange={changeContentHandler}/>

                <input 
                    type="submit"
                    style={{ fontSize: '15px', display:'block', position: 'relative', top:'5vh', backgroundColor: 'white', borderRadius:'5px', border: '2px solid black'}}
                    value="Add Comment"/>
            </form>
        </div>
    );
}

export default CreateCommentPost;