// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import PostList from './components/PostList';
// // import PostDetail from './components/PostDetail';
// // import PostForm from './components/PostForm';
// // import Login from './components/Login';
// // import Signup from './components/Signup';
// // import MyPosts from './components/MyPosts';
// // import ProtectedRoute from './components/ProtectedRoute';
//    import Navbar from './components/Navbar';
//    import PostList from './components/PostList';
//    import PostDetail from './components/PostDetail';
//    import PostForm from './components/PostForm';
//    import Login from './components/Login';
//    import Signup from './components/Signup';
//    import MyPosts from './components/MyPosts';
//    import ProtectedRoute from './components/ProtectedRoute';
   
   

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="max-w-5xl mx-auto px-4 py-6">
//         <Routes>
//           <Route path="/" element={<PostList />} />
//           <Route path="/post/:id" element={<PostDetail />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/new" element={
//             <ProtectedRoute><PostForm /></ProtectedRoute>
//           } />
//           <Route path="/edit/:id" element={
//             <ProtectedRoute><PostForm editMode={true} /></ProtectedRoute>
//           } />
//           <Route path="/myposts" element={
//             <ProtectedRoute><MyPosts /></ProtectedRoute>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Signup from './components/Signup';
import MyPosts from './components/MyPosts';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
          <Route path="/new" element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          } />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <PostForm editMode={true} />
            </ProtectedRoute>
          } />
          <Route path="/myposts" element={
            <ProtectedRoute>
              <MyPosts />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

