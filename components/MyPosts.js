// // // src/components/MyPosts.js
// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import api from '../api';

// // const MyPosts = () => {
// //   const [myPosts, setMyPosts] = useState([]);

// //   useEffect(() => {
// //     fetchMyPosts();
// //   }, []);

// //   const fetchMyPosts = async () => {
// //     try {
// //       const res = await api.get('/myposts');
// //       setMyPosts(res.data);
// //     } catch (err) {
// //       console.error('Error fetching my posts:', err);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     if (window.confirm('Are you sure you want to delete this post?')) {
// //       try {
// //         await api.delete(`/posts/${id}`);
// //         setMyPosts(myPosts.filter(post => post.id !== id));
// //       } catch (err) {
// //         console.error('Error deleting post:', err);
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>My Blog Posts</h2>
// //       {myPosts.length === 0 ? (
// //         <p>You haven't created any posts yet.</p>
// //       ) : (
// //         myPosts.map(post => (
// //           <div key={post.id} style={styles.card}>
// //             <h3>{post.title}</h3>
// //             <div style={styles.actions}>
// //               <Link to={`/edit/${post.id}`} style={styles.editBtn}>Edit</Link>
// //               <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
// //             </div>
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // };

// // const styles = {
// //   card: {
// //     padding: '15px',
// //     borderBottom: '1px solid #ccc',
// //   },
// //   actions: {
// //     marginTop: '10px',
// //     display: 'flex',
// //     gap: '10px',
// //   },
// //   editBtn: {
// //     padding: '6px 12px',
// //     backgroundColor: '#007bff',
// //     color: 'white',
// //     textDecoration: 'none',
// //   },
// //   deleteBtn: {
// //     padding: '6px 12px',
// //     backgroundColor: '#dc3545',
// //     color: 'white',
// //     border: 'none',
// //     cursor: 'pointer',
// //   },
// // };

// // export default MyPosts;

















// // src/components/MyPosts.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../api';

// const MyPosts = () => {
//   const [myPosts, setMyPosts] = useState([]);

//   useEffect(() => {
//     fetchMyPosts();
//   }, []);

//   const fetchMyPosts = async () => {
//     try {
//       const res = await api.get('/posts/mine');  // <-- Corrected endpoint
//       setMyPosts(res.data);
//     } catch (err) {
//       console.error('Error fetching my posts:', err);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this post?')) {
//       try {
//         await api.delete(`/posts/${id}`);
//         setMyPosts(myPosts.filter(post => post.id !== id));
//       } catch (err) {
//         console.error('Error deleting post:', err);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>My Blog Posts</h2>
//       {myPosts.length === 0 ? (
//         <p>You haven't created any posts yet.</p>
//       ) : (
//         myPosts.map(post => (
//           <div key={post.id} style={styles.card}>
//             <h3>{post.title}</h3>
//             <div style={styles.actions}>
//               <Link to={`/edit/${post.id}`} style={styles.editBtn}>Edit</Link>
//               <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// const styles = {
//   card: {
//     padding: '15px',
//     borderBottom: '1px solid #ccc',
//   },
//   actions: {
//     marginTop: '10px',
//     display: 'flex',
//     gap: '10px',
//   },
//   editBtn: {
//     padding: '6px 12px',
//     backgroundColor: '#007bff',
//     color: 'white',
//     textDecoration: 'none',
//   },
//   deleteBtn: {
//     padding: '6px 12px',
//     backgroundColor: '#dc3545',
//     color: 'white',
//     border: 'none',
//     cursor: 'pointer',
//   },
// };

// export default MyPosts;






























// src/components/MyPosts.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/myposts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMyPosts(res.data);
    } catch (err) {
      console.error('Error fetching my posts:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMyPosts(myPosts.filter(post => post.id !== id));
      } catch (err) {
        console.error('Error deleting post:', err);
      }
    }
  };

  return (
    <div>
      <h2>My Blog Posts</h2>
      {myPosts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        myPosts.map(post => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <div style={styles.actions}>
              <Link to={`/edit/${post.id}`} style={styles.editBtn}>Edit</Link>
              <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
  },
  actions: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px',
  },
  editBtn: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
  },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

export default MyPosts;


