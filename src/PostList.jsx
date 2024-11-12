import React from 'react';

function PostList({ posts, updatePost, deletePost}){
    return (
        <div>
            <h2>All posts</h2>
            {posts.map((post)=>(
                <div key={post.id} >
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button onClick={() => updatePost(post.id, {title: prompt ('New title:', post.title), body: prompt('New body:', post.body)})}>
                        Edit
                    </button>
                    <button onClick={() => deletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default PostList;