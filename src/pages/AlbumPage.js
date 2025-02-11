import React, { useEffect, useState } from 'react';
import './AlbumPage.css';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, InputLabel, Pagination, TextField } from '@mui/material';

const AlbumPage = () => {
  const [albums, setAlbums] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [artistFilter, setArtistFilter] = useState('');
  const [decadeFilter, setDecadeFilter] = useState('');
  const [formatFilter, setFormatFilter] = useState('');
  const [page, setPage] = useState(1);
  const albumsPerPage = 20;
  const [uniqueArtists, setUniqueArtists] = useState([]);
  const [uniqueFormats, setUniqueFormats] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_GO_API_URL;
    fetch(`${apiUrl}/media`)
      .then(response => response.json())
      .then(data => {
        setAlbums(data);
        const allGenreTags = data.flatMap(album => album.genre_tags);
        const uniqueGenres = [...new Set(allGenreTags)];
        setGenres(uniqueGenres);

        // Extract unique artists and formats
        const allArtists = data.map(album => album.artist);
        const uniqueArtistsSet = [...new Set(allArtists)];
        setUniqueArtists(uniqueArtistsSet);

        const allFormats = data.map(album => album.format);
        const uniqueFormatsSet = [...new Set(allFormats)];
        setUniqueFormats(uniqueFormatsSet);
      })
      .catch(error => console.error('Error fetching albums:', error));
  }, []);

  const handleGenreChange = (event) => {
    setSelectedGenres(event.target.value);
    setPage(1);
  };

  const handleArtistChange = (event) => {
    setArtistFilter(event.target.value);
    setPage(1);
  };

  const handleDecadeChange = (event) => {
    setDecadeFilter(event.target.value);
    setPage(1);
  };

  const handleFormatChange = (event) => {
    setFormatFilter(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => { // Define handlePageChange
    setPage(value);
  };

  const filteredAlbums = albums.filter(album => {
    // Genre filter
    if (selectedGenres.length > 0 && !album.genre_tags.some(genre => selectedGenres.includes(genre))) {
      return false;
    }

    // Artist filter
    if (artistFilter && album.artist !== artistFilter) {
      return false;
    }

    // Decade filter
    if (decadeFilter) {
      const year = new Date(album.date_published).getFullYear();
      const decadeStart = parseInt(decadeFilter);
      const decadeEnd = decadeStart + 9;
      if (year < decadeStart || year > decadeEnd) {
        return false;
      }
    }

    // Format filter
    if (formatFilter && album.format !== formatFilter) {
      return false;
    }

    return true;
  });

  const startIndex = (page - 1) * albumsPerPage;
  const endIndex = startIndex + albumsPerPage;
  const paginatedAlbums = filteredAlbums.slice(startIndex, endIndex);

  return (
    <div className="album-page">
      <div className="page-content">
        <h2>Filters</h2>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="artist-select-label">Artist</InputLabel>
              <Select
                labelId="artist-select-label"
                id="artist-select"
                value={artistFilter}
                label="Artist"
                onChange={handleArtistChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {uniqueArtists.map((artist) => (
                  <MenuItem key={artist} value={artist}>
                    {artist}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="decade-select-label">Decade</InputLabel>
              <Select
                labelId="decade-select-label"
                id="decade-select"
                value={decadeFilter}
                label="Decade"
                onChange={handleDecadeChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="1960">1960s</MenuItem>
                <MenuItem value="1970">1970s</MenuItem>
                <MenuItem value="1980">1980s</MenuItem>
                <MenuItem value="1990">1990s</MenuItem>
                <MenuItem value="2000">2000s</MenuItem>
                <MenuItem value="2010">2010s</MenuItem>
                <MenuItem value="2020">2020s</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="format-select-label">Format</InputLabel>
              <Select
                labelId="format-select-label"
                id="format-select"
                value={formatFilter}
                label="Format"
                onChange={handleFormatChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {uniqueFormats.map((format) => (
                  <MenuItem key={format} value={format}>
                    {format}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="genre-multiple-select-label">Genres</InputLabel>
              <Select
                labelId="genre-multiple-select-label"
                id="genre-multiple-select"
                multiple
                value={selectedGenres}
                onChange={handleGenreChange}
                renderValue={(selected) => selected.join(', ')}
                label="Genres"
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <h2>Albums</h2>
        <Grid container spacing={2}>
          {paginatedAlbums.map((album) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={album.id}>
              <Card style={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={album.image_url}
                  alt={album.title}
                />
                <Typography
                  variant="h6"
                  component="div"
                  style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    color: 'white',
                    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000',
                    zIndex: 2,
                  }}
                >
                  {album.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={Math.ceil(filteredAlbums.length / albumsPerPage)}
          page={page}
          onChange={handlePageChange}
          style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
        />
      </div>
    </div>
  );
};

export default AlbumPage;