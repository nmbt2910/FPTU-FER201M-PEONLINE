import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Card, CardContent, CardMedia, Box } from '@mui/material';

function Detail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS/${id}`
        );
        setNews(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  if (!news) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia component="img" height="300" image={news.img} alt={news.title} />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {news.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Views: {news.views}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {news.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {news.content}
          </Typography>
          <Typography variant="caption">
            Created: {new Date(news.created).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Detail;