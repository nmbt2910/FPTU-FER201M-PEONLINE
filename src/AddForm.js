import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Box,
} from '@mui/material';

function AddForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    created: '',
    status: false,
    views: 1,
    actractive: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    const isValid = await validateForm();
    if (isValid) {
      // Submit the form data
      submitForm();
    }
  };

  const validateForm = async () => {
    const schema = Yup.object().shape({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      content: Yup.string().required('Content is required'),
      created: Yup.date().required('Created date is required'),
      views: Yup.number()
        .required('Views count is required')
        .positive()
        .integer(),
    });

    try {
      await schema.validate(formData, { abortEarly: false });
      return true;
    } catch (error) {
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      console.log('Validation errors:', validationErrors);
      return false;
    }
  };

  const submitForm = () => {
    // Prepare the data for the API request
    const postData = {
      title: formData.title,
      description: formData.description,
      content: formData.content,
      img:
        'https://daihoc.fpt.edu.vn/en/wp-content/uploads/2022/09/dua-nhac-cu-den-cong-dong-373x206.jpg',
      status: formData.status,
      views: formData.views,
      actractive: formData.actractive,
    };

    // Make the POST request to the API
    axios
      .post('https://6544c6ed5a0b4b04436cf57f.mockapi.io/FPTSUCKS', postData)
      .then((response) => {
        console.log('Post successful:', response.data);
        // Redirect to the Dashboard or another appropriate page
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add News
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              minRows={5}
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Created"
              type="date"
              name="created"
              value={formData.created}
              onChange={handleChange}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
              }
              label="Status"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Views"
              type="number"
              name="views"
              value={formData.views}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="actractive"
                  checked={formData.actractive}
                  onChange={handleChange}
                />
              }
              label="Attractive"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default AddForm;