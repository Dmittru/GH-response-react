import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RepositoryPage = ({ match }) => {
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repositories/${match.params.id}`);
        setRepository(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRepository();
  }, [match.params.id]);

  return (
    <div>
      {repository ? (
        <div>
          <h1>{repository.name}</h1>
          <p>Stars: {repository.stargazers_count}</p>
          <p>Last Commit: {new Date(repository.updated_at).toLocaleDateString()}</p>
          {repository.owner && (
            <div>
              {repository.owner.avatar_url && (
                <img src={repository.owner.avatar_url} alt={repository.owner.login} />
              )}
              <a href={repository.owner.html_url} target="_blank" rel="noopener noreferrer">
                {repository.owner.login}
              </a>
            </div>
          )}
          {repository.language && <p>Language: {repository.language}</p>}
          {repository.description && <p>Description: {repository.description}</p>}
          {/* Render contributors list */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryPage;
