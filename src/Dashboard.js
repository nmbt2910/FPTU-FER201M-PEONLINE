import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Typography, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function Dashboard() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS'
      );
      setNewsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Dashboard
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsList.map((news) => (
              <TableRow key={news.id}>
                <TableCell>{news.id}</TableCell>
                <TableCell>{news.title}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/edit/${news.id}`}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(news.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Dashboard;