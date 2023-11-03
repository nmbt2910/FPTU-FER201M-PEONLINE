import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {
  Typography,
  TextField,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
} from '@mui/material';

function EditNews() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    created: '',
    status: false,
    views: 1,
    attractive: false,
    img: '',
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, [id]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(`https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS/${id}`);
      const { title, img, description, content, created, status, views, attractive } = response.data;
      setFormData({ title, img, description, content, created, status, views, attractive });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.title.trim()) {
      errors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.title.trim()) {
        errors.img = 'Image is required';
        isValid = false;
      }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.content.trim()) {
      errors.content = 'Content is required';
      isValid = false;
    }

    if (!formData.created) {
      errors.created = 'Created Date is required';
      isValid = false;
    }

    if (isNaN(formData.views) || formData.views < 1) {
      errors.views = 'Views should be a number greater than 0';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        await axios.put(`https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS/${id}`, formData);
        // Show success message
        alert('News item updated successfully!');
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.log(error);
        // Show error message
        alert('An error occurred while updating the news item.');
      }
    }
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Edit News
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.title}
            helperText={formErrors.title}
          />
          <TextField
            label="Image"
            name="image"
            value={formData.img}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.img}
            helperText={formErrors.img}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            multiline
            fullWidth
            required
            error={!!formErrors.description}
            helperText={formErrors.description}
          />
          <TextareaAutosize
            rowsMin={3}
            placeholder="Content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            fullWidth
            required
            style={{ marginTop: 10, marginBottom: 10 }}
            error={!!formErrors.content}
            helperText={formErrors.content}
          />
          <TextField
            label="Created Date"
            name="created"
            type="date"
            value={formData.created}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.created}
            helperText={formErrors.created}
            sx={{ width: '100%' }}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                min: new Date().toISOString().split('T')[0],
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="status"
                checked={formData.status}
                onChange={handleCheckboxChange}
              />
            }
            label="Status"
          />
          <TextField
            label="Views"
            name="views"
            type="number"
            value={formData.views}
            onChange={handleInputChange}
            fullWidth
            required
            error={!!formErrors.views}
            helperText={formErrors.views}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="attractive"
                checked={formData.attractive}
                onChange={handleCheckboxChange}
              />
            }
            label="Attractive"
          />
          <Button type="submit" variant="contained">
            Update
          </Button>
          <Button component={Link} to="/dashboard" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </form>
    </div>
  );
}

export default EditNews;