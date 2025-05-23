// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await api.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const filteredPosts = posts.filter(
    post =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Blog Posts</h2>
      <input
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />
      {filteredPosts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        filteredPosts.map(post => (
          <div key={post.id} style={styles.postCard}>
            <h3>
              <Link to={`/post/${post.id}`} style={styles.postTitle}>
                {post.title}
              </Link>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: post.content.slice(0, 150) + '...' }}></p>
            <p style={styles.meta}>
              By <strong>{post.author}</strong> on {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  searchInput: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    fontSize: '16px',
  },
  postCard: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  postTitle: {
    textDecoration: 'none',
    color: '#007bff',
  },
  meta: {
    fontSize: '14px',
    color: '#555',
  },
};

export default PostList;
