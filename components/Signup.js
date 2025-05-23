// // // src/components/Signup.js
// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import api from '../api';

// // const Signup = () => {
// //   const [username, setUsername] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');
// //   const navigate = useNavigate();

// //   const handleSignup = async (e) => {
// //   e.preventDefault();
// //   try {
// //     const res = await api.post('/signup', { username, email, password });
// //     console.log(' Signup Success:', res.data);
// //     navigate('/login');
// //   } catch (err) {
// //     console.error(' Signup Error:', err.response?.data || err.message);
// //     setError('Registration failed. Try again.');
// //   }
// // };

// //   return (
// //     <div style={styles.container}>
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSignup} style={styles.form}>
// //         <input
// //           type="text"
// //           placeholder="Username"
// //           value={username}
// //           required
// //           onChange={(e) => setUsername(e.target.value)}
// //           style={styles.input}
// //         />
// //         <input
// //           type="email"
// //           placeholder="Email"
// //           value={email}
// //           required
// //           onChange={(e) => setEmail(e.target.value)}
// //           style={styles.input}
// //         />
// //         <input
// //           type="password"
// //           placeholder="Password"
// //           value={password}
// //           required
// //           onChange={(e) => setPassword(e.target.value)}
// //           style={styles.input}
// //         />
// //         {error && <p style={styles.error}>{error}</p>}
// //         <button type="submit" style={styles.button}>Signup</button>
// //       </form>
// //     </div>
// //   );
// // };

// // const styles = {
// //   container: {
// //     maxWidth: '400px',
// //     margin: 'auto',
// //   },
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //     gap: '10px',
// //   },
// //   input: {
// //     padding: '10px',
// //     fontSize: '16px',
// //   },
// //   button: {
// //     padding: '10px',
// //     backgroundColor: '#28a745',
// //     color: 'white',
// //     border: 'none',
// //     fontSize: '16px',
// //     cursor: 'pointer',
// //   },
// //   error: {
// //     color: 'red',
// //     fontWeight: 'bold',
// //   },
// // };

// // export default Signup;









// // src/components/Signup.js
// // src/components/Signup.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signupUser } from '../api';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault(); // ✅ RESTORED THIS LINE
//     try {
//       const res = await signupUser({ username, email, password });
//       console.log('✅ Signup Success:', res.message || res);
//       navigate('/login');
//     } catch (err) {
//       console.log("🔥 Full error:", err);
//       console.log("📦 Response error:", err.response?.data);
//       const errorMessage =
//         err.response?.data?.message || 'Registration failed. Try again.';
//       console.error('❌ Signup Error:', errorMessage);
//       setError(errorMessage);
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSignup} style={styles.form}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           required
//           onChange={(e) => setUsername(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           required
//           onChange={(e) => setEmail(e.target.value)}
//           style={styles.input}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           required
//           onChange={(e) => setPassword(e.target.value)}
//           style={styles.input}
//         />
//         {error && <p style={styles.error}>{error}</p>}
//         <button type="submit" style={styles.button}>Signup</button>
//       </form>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     maxWidth: '400px',
//     margin: 'auto',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '10px',
//   },
//   input: {
//     padding: '10px',
//     fontSize: '16px',
//   },
//   button: {
//     padding: '10px',
//     backgroundColor: '#28a745',
//     color: 'white',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
//   },
//   error: {
//     color: 'red',
//     fontWeight: 'bold',
//   },
// };

// export default Signup;














// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Optional if user is already logged in

      const res = await axios.post(
        'http://localhost:5000/api/auth/signup',
        form,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      console.log('✅ Signup Success:', res.data);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('❌ Signup Error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={form.password}
          required
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Signup</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
};

export default Signup;




