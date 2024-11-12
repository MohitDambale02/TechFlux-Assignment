import React, { useEffect, useState } from "react";
import PostForm from './PostForm';
import PostList from "./PostList";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error encountered:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const createPost = async (newPost) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      const createdPost = await response.json();
      setPosts([...posts, createdPost]);
    } catch (error) {
      console.error('Error while creating Posts', error);
    }
  };

  const updatePost = async (id, updatedPost) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      const updated = await response.json();
      setPosts(posts.map((post) => (post.id === id ? updated : post)));
    } catch (error) {
      console.error('Error occurred while updating post', error);
    }
  };

  const deletePost = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
        });
        setPosts(posts.filter((post) => post.id !== id));
      } catch (error) {
        console.error('Error occurred while deleting the post', error);
      }
    }
  };

  return (
    <div>
      <h1>CRUD Operations with jsonplaceholder </h1>
      <PostForm createPost={createPost} />
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <PostList posts={posts} updatePost={updatePost} deletePost={deletePost} />
      )}
    </div>
  );
}

export default App;
