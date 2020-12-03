import React from 'react'
import {Link, useRouteMatch} from 'react-router-dom'

const PostDescription = ({post}) => {
    const {url} = useRouteMatch();
    const title = post.postTitle.substring(0, 14).concat("...");
    const content = post.postBody.substring(0, 14).concat("...");
    return (
        <Link to={`${url}post/${post.id}`} style={{color:'black', textDecoration: 'none'}}>
            <h1>{title}</h1>
            <p>{content}</p>
        </Link>
    );
}

export default PostDescription