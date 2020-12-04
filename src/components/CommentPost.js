import React from 'react';
import { API, graphqlOperation} from 'aws-amplify';
import {connect} from 'react-redux';
import UpdateComment from './UpdateComment';
import { deleteComment} from '../graphql/mutations';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const CommentPost = props => {
    
    const {commentOwnerUsername, createdAt, content, id} = props.comment;

    const deleteCommentHandler = async () => {
        if(props.username === commentOwnerUsername){
            const input = {
                id
            };
            console.log(content);
            await API.graphql(graphqlOperation(deleteComment, {input}));
        }
    }

    return (
        <div style={{backgroundColor:'rgba(0, 0, 0, 0.70)', borderRadius:'5px',marginLeft: '3vw', marginTop: '5vh', width: '90%', wordWrap: 'break-word'}}>
            <div style={{backgroundColor:'rgb(255, 255, 255)', border:'1px solid black', borderRadius:'5px', padding: '2vh 2vw', position: 'relative', right:'1vw', bottom: '1vh'}}> 
                {props.username === commentOwnerUsername && <><FontAwesomeIcon icon={faTrash} onClick={deleteCommentHandler} /> <UpdateComment comment={props.comment}/></>}
                <p> "{content}"</p>
                    {"-"} {commentOwnerUsername} {" "}
                    <time style={{ fontStyle: "italic"}}>
                        {new Date(createdAt).toDateString()}
                    </time>
            </div>
        </div>
    );
}

const fromState = state => {
    return {
        username: state.user.username,
        signedIn: state.user.signedIn
    };
};

export default connect(fromState)(CommentPost);
