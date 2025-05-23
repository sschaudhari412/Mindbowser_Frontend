// src/components/PostForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import api from '../api';

const PostForm = ({ editMode = false }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (editMode && id) {
      fetchPost();
    }
  }, [editMode, id]);

  const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
    } catch (err) {
      console.error('Error loading post:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/posts/${id}`, { title, content });
      } else {
        await api.post('/posts', { title, content });
      }
      navigate('/');
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>{editMode ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
        <CKEditor
          editor={ClassicEditor}
          data={content}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
        />
        <button type="submit" style={styles.button}>
          {editMode ? 'Update' : 'Publish'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: 'auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '18px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default PostForm;
