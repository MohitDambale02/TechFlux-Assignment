import React, { useState, useEffect } from 'react';

function PostForm({ createPost, updatePost, postToEdit }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setBody(postToEdit.body);
    }
  }, [postToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postToEdit) {
      updatePost(postToEdit.id, { title, body, userId: 1 });
    } else {
      createPost({ title, body, userId: 1 });
    }
    // Reset fields after form submission
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{postToEdit ? 'Edit Post' : 'Create New Post'}</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <br />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Body"
      />
      <br />
      <button type="submit">{postToEdit ? 'Update Post' : 'Create Post'}</button>
    </form>
  );
}

export default PostForm;
