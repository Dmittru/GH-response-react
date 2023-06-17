import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const ITEMS_PER_PAGE = 10;
  const API_URL = 'https://api.github.com/search/repositories';
  const ACCESS_TOKEN = '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';

  useEffect(() => {
    fetchRepositories();
  }, [currentPage]);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: searchQuery,
          sort: 'stars',
          order: 'desc',
          per_page: ITEMS_PER_PAGE,
          page: currentPage,
          access_token: ACCESS_TOKEN,
        },
      });
      const data = response.data;
      const repositories = data.items;
      const totalPages = Math.ceil(data.total_count / ITEMS_PER_PAGE);

      setRepositories(repositories);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Github Dashboard</h1>
      <div style={{display:'inline-block', margin:'15px'}}>
        <input
            type="text"
            value={searchQuery}
            onChange={(e)=>{setSearchQuery(e.target.value)}}
            placeholder="Search repositories..."
        />
        <button onClick={()=>{fetchRepositories()}}>KILL STUPIDO NIGGAS&MEXICOS&RETARDOS → (search GitHub) ← </button>
      </div>
      
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <h2>{repo.name}</h2>
            <p>Stars: {repo.stargazers_count}</p>
            <p>Last Commit: {new Date(repo.updated_at).toLocaleDateString()}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button key={page} onClick={() => setCurrentPage(page)}>
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
