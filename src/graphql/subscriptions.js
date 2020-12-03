/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      name
      username
      createdAt
      comments {
        id
        commentOwnerId
        commentOwnerUsername
        postId
        post {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      posts {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      name
      username
      createdAt
      comments {
        id
        commentOwnerId
        commentOwnerUsername
        postId
        post {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      posts {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      name
      username
      createdAt
      comments {
        id
        commentOwnerId
        commentOwnerUsername
        postId
        post {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        content
        createdAt
        updatedAt
      }
      posts {
        items {
          id
          postOwnerId
          postOwnerUsername
          postTitle
          postBody
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          postId
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
        postId
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          postId
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
        postId
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
      id
      postOwnerId
      postOwnerUsername
      postTitle
      postBody
      createdAt
      comments {
        items {
          id
          commentOwnerId
          commentOwnerUsername
          postId
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      likes {
        id
        numberLikes
        likeOwnerId
        likeOwnerUsername
        postId
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      commentOwnerId
      commentOwnerUsername
      postId
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          postId
          createdAt
          updatedAt
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      commentOwnerId
      commentOwnerUsername
      postId
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          postId
          createdAt
          updatedAt
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      commentOwnerId
      commentOwnerUsername
      postId
      post {
        id
        postOwnerId
        postOwnerUsername
        postTitle
        postBody
        createdAt
        comments {
          nextToken
        }
        likes {
          id
          numberLikes
          likeOwnerId
          likeOwnerUsername
          postId
          createdAt
          updatedAt
        }
        updatedAt
      }
      content
      createdAt
      updatedAt
    }
  }
`;
export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike {
    onCreateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      postId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike {
    onUpdateLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      postId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike {
    onDeleteLike {
      id
      numberLikes
      likeOwnerId
      likeOwnerUsername
      postId
      createdAt
      updatedAt
    }
  }
`;
