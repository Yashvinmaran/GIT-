// components/home/BlogSection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import './BlogSection.css'; // Import CSS for styling
import { FaNewspaper } from 'react-icons/fa';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLatestPosts = async () => {
      setLoading(true);
      setError('');
      try {
        // Assuming your backend API endpoint for latest blog posts is '/blog/latest'
        const response = await api.get('/blog/latest?limit=3'); // Fetching only 3 latest posts
        console.log("Blog Posts API Response:", response.data); // DEBBUGGING: Check the response structure

        // Check if the response data is an array or contains an array
        if (Array.isArray(response.data)) {
          setPosts(response.data);
        } else if (response.data && Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
        } else if (response.data && Array.isArray(response.data.articles)) {
          setPosts(response.data.articles);
        } else if (response.data && Array.isArray(response.data.items)) {
          setPosts(response.data.items);
        } else {
          setError('Invalid blog posts data received from the server.');
        }
      } catch (err) {
        console.error('Error fetching latest blog posts:', err);
        setError('Could not load latest blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  if (loading) {
    return <div className="blog-section loading">Loading latest blog posts...</div>;
  }

  if (error) {
    return <div className="blog-section error">{error}</div>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="blog-section empty">
        <FaNewspaper className="empty-icon" />
        <p>No blog posts available yet.</p>
      </div>
    );
  }

  return (
    <div className="blog-section">
      <h2>Latest from Our Blog</h2>
      <div className="blog-grid">
        {posts.map(post => (
          <Link key={post._id} to={`/blog/${post._id}`} className="blog-card">
            <div className="post-image-container">
              <img src={post.imageUrl || '/placeholder-blog.png'} alt={post.title} className="post-image" />
            </div>
            <div className="post-info">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
              <p className="post-excerpt">{post.excerpt?.substring(0, 100)}...</p> {/* Added optional chaining */}
              <button className="read-more-button">Read More</button>
            </div>
          </Link>
        ))}
      </div>
      {posts.length > 0 && (
        <div className="view-all-blog">
          <Link to="/blog">View All Blog Posts</Link>
        </div>
      )}
    </div>
  );
};

export default BlogSection;