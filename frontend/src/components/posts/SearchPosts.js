import { useState } from 'react';
import axios from 'axios';

const SearchPosts = ({ setPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/posts/search?q=${searchTerm}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">Search</button>
    </form>
  );
};

export default SearchPosts;
