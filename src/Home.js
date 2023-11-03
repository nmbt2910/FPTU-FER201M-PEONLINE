import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Grid, Card, CardMedia, CardContent, Button, Box } from '@mui/material';

function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS'
      );
      const data = response.data.filter((item) => item.actractive === true);
      setNews(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Home
      </Typography>
      <Grid container spacing={2}>
        {news.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.img}
                alt={item.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <Button component={Link} to={`/detail/${item.id}`} variant="contained" color="primary">
                  Read More
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;