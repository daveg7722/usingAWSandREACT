import { API, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { deletePost } from '../graphql/mutations';
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const DeletePost = (props) => {
    const history = useHistory();
    const deletePostHandler = async (id) => {
        const input = {
            id
        };
        await API.graphql(graphqlOperation(deletePost, {input}));
        history.goBack();        
    }

    return (
        <FontAwesomeIcon icon={faTrash} onClick={() => deletePostHandler(props.postId)}  style={{margin:'0 2vw'}}/>
    );
};

export default DeletePost;


/*<button onClick={() => deletePostHandler(props.postId)}>Delete</button>*/