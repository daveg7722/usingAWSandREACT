import { API, graphqlOperation } from 'aws-amplify';
import React, {useState, useCallback} from 'react';
import { updateComment } from '../graphql/mutations';

import * as classes from '../css/EditPost.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faWindowClose} from '@fortawesome/free-solid-svg-icons'

const UpdateComment = (props) => {

    const {id, commentOwnerUsername, commentOwnerId, postId, content, createdAt} = props.comment;

    const [showModal, setShowModal] = useState(false);
    const [commentContent, setCommentContent] = useState(content)

    const onChangeCommentHandler = event => {
        setCommentContent(event.target.value);
    }

    const editCommentHandler = async (event) => {
        event.preventDefault();
        console.log(id);
        const input = {
            id,
            commentOwnerId,
            commentOwnerUsername,
            postId,
            content: commentContent,
            createdAt
        }
        await API.graphql(graphqlOperation(updateComment, {input}));

        setShowModal(false);
    }

    const stopScroll = useCallback(() => {
        console.log("scrolling ....")
        //e.preventDefault();
    }, []);

    const showModalHandler = () => {
        //window.removeEventListener("wheel", stopScroll, true);//{passive:false});
        setShowModal(show => {
            //if(!show) window.addEventListener("wheel", stopScroll, true) // {passive: false});
            return !show
        });
    }

    return (
        <>
            { showModal && (
                    <div className={classes.blur}>
                        <div className={classes.modal}>
                            <FontAwesomeIcon icon={faWindowClose} className={classes.close} 
                                onClick={() => {showModalHandler(); window.removeEventListener('wheel', stopScroll, true)}}/>
                            <form onSubmit={editCommentHandler}> 
                                <textarea
                                type="text"
                                className={classes.content}
                                name="commentContent"
                                rows="3"
                                cols="40"
                                required
                                value={commentContent}
                                onChange={onChangeCommentHandler}/>

                                <input 
                                type="submit"
                                className={classes.submit}
                                style={{fontsize: '19px'}}/>
                            </form>
                        </div>
                    </div>
                )
            }
            <FontAwesomeIcon icon={faEdit} style={{margin:'0 2vw'}}
                            onClick={() => {showModalHandler(); window.addEventListener('wheel', stopScroll, true) }}/>
        </>
    );
};

export default UpdateComment;
