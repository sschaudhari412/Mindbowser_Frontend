// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';
//import jwtDecode from 'jwt-decode';
//import jwtDecode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';



const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.userId;
  }

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p style={styles.meta}>
        By <strong>{post.author}</strong> on {new Date(post.created_at).toLocaleDateString()}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} style={styles.content}></div>

      {userId === post.user_id && (
        <div style={styles.actions}>
          <Link to={`/edit/${post.id}`} style={styles.editBtn}>Edit</Link>
          <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  meta: {
    color: '#777',
    fontSize: '14px',
  },
  content: {
    marginTop: '20px',
    fontSize: '16px',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    padding: '8px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
  },
  deleteBtn: {
    padding: '8px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default PostDetail;
