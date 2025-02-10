import React, { useEffect, useState } from 'react';
import './AlbumPage.css'; // Import the CSS file

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    // Fetch albums from the /media endpoint using the environment variable
    const apiUrl = process.env.REACT_APP_GO_API_URL;
    fetch(`${apiUrl}/media`)
      .then(response => response.json())
      .then(data => setAlbums(data))
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  return (
    <div className="album-page">
      <div className="page-content"> {/* Add container */}
        <h2>Albums</h2>
        <div className="album-grid">
          {albums.map((album) => (
            <div key={album.id} className="album-card">
              <img src={album.image_url} alt={album.title} className="album-image" />
              <div className="album-info">
                <h3>{album.title}</h3>
                <p>{album.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div> {/* End container */}
    </div>
  );
};

export default AlbumPage;