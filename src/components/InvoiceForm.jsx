import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Grid,
  Paper,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
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

  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'description' ? value : parseFloat(value);
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Invoice Data:', invoiceData);
    console.log('Items:', items);
    // You can handle invoice generation here (PDF/download/API)
  };

  const calculateTotal = () =>
    items.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 2 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <Typography variant="h4" gutterBottom align="center" color="primary">
          Create Invoice
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {[
              { label: 'Company Name', name: 'companyName' },
              { label: 'Client Name', name: 'clientName' },
              { label: 'Invoice Number', name: 'invoiceNumber' },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  label={label}
                  name={name}
                  fullWidth
                  value={invoiceData[name]}
                  onChange={handleChange}
                  required
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
          </Grid>

          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Invoice Items
          </Typography>

          <TableContainer component={Paper} sx={{ mb: 3 }}>
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
                    <TableCell>
                      <TextField
                        fullWidth
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                        placeholder="Description"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        inputProps={{ min: 1 }}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <TextField
                        type="number"
                        inputProps={{ min: 0, step: 0.01 }}
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length === 1}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Button startIcon={<AddIcon />} onClick={handleAddItem}>
                      Add Item
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" align="right" sx={{ mb: 2 }}>
            Total: ${calculateTotal()}
          </Typography>

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
        </form>
      </Paper>
    </Box>
  );
};

export default InvoiceForm;
