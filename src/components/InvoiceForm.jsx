import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Box,
} from '@mui/material';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyName: '',
    clientName: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
  });

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(invoiceData);
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: 'auto',
        mt: 5,
        p: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          borderRadius: 3,
          backgroundColor: '#fafafa',
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Create Invoice
        </Typography>
        <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  {[
                    { label: 'Company Name', name: 'companyName', required: true },
                    { label: 'Client Name', name: 'clientName', required: true },
                    { label: 'Invoice Number', name: 'invoiceNumber', required: true },
                  ].map(({ label, name, required }) => (
                    <Grid item xs={12} sm={6} key={name}>
                      <TextField
                        label={label}
                        name={name}
                        fullWidth
                        value={invoiceData[name]}
                        onChange={handleChange}
                        required={required}
                      />
                    </Grid>
                  ))}
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Issue Date"
                      name="issueDate"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={invoiceData.issueDate}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Due Date"
                      name="dueDate"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={invoiceData.dueDate}
                      onChange={handleChange}
                      required
                    />
                  </Grid>
      
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      size="large"
                      sx={{ fontWeight: 'bold' }}
                    >
                      Generate Invoice
                    </Button>
                  </Grid>
                </Grid>
              </form>
                      </Paper>
              </Box>
            );
          };
          
          export default InvoiceForm;
