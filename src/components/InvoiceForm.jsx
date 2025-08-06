import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Box,
} from '@mui/material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableFooter,


} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    companyName: '',
    clientName: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
  });

  const [items, setItems] = useState([
  { description: '', quantity: 1, price: 0 },
]);


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
              <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
  Invoice Items
</Typography>
<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Description</TableCell>
        <TableCell align="right">Quantity</TableCell>
        <TableCell align="right">Price</TableCell>
        <TableCell align="right">Total</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((item, index) => (
        <TableRow key={index}>
          <TableCell>{item.description}</TableCell>
          <TableCell align="right">{item.quantity}</TableCell>
          <TableCell align="right">{item.price}</TableCell>
          <TableCell align="right">{(item.quantity * item.price).toFixed(2)}</TableCell>
          <TableCell align="center">
            <IconButton aria-label="delete" size="small">
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell colSpan={5} align="center">
          <IconButton aria-label="add" size="small">
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</TableContainer>

                      </Paper>
              </Box>
            );
          };
          
          export default InvoiceForm;
