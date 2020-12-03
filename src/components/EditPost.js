import { API, graphqlOperation } from 'aws-amplify';
import React, {useState, useCallback} from 'react';
import { updatePost } from '../graphql/mutations';

import * as classes from '../css/EditPost.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faWindowClose} from '@fortawesome/free-solid-svg-icons'

const EditPost = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [postTitle, setPostTitle] = useState(props.post.postTitle);
    const [postBody, setPostBody] = useState(props.post.postBody)

    const editPostTitleHandler = event => {
        setPostTitle(event.target.value);
    }

    const editPostBodyHandler = event => {
        setPostBody(event.target.value);
    }

    const editPostHandler = async (event, post) => {
        event.preventDefault();
        const input = {
            id: post.id,
            postOwnerId: post.postOwnerId,
            postOwnerUsername: post.postOwnerUsername,
            postTitle,
            postBody
        }
        console.log(input);
        await API.graphql(graphqlOperation(updatePost, {input}));

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
                            <form onSubmit={(event) => editPostHandler(event, props.post)}> 
                                <input style={{ font: '19px'}}
                                className={classes.title}
                                type="text" 
                                name="postTitle"
                                required
                                value={postTitle}
                                onChange={editPostTitleHandler}/>

                                <textarea
                                type="text"
                                className={classes.content}
                                name="postBody"
                                rows="3"
                                cols="40"
                                required
                                value={postBody}
                                onChange={editPostBodyHandler}/>

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

export default EditPost;

// <button className="close"
//     onClick={showModalHandler}>
//     x
// </button>