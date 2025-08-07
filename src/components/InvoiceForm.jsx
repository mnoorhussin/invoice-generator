import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Box,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvoiceForm = () => {
  const [items, setItems] = useState([
    { description: "", quantity: 1, price: 0 },
  ]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === "description" ? value : parseFloat(value);
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const getTotal = () => {
    return items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const exportPDF = () => {
  const doc = new jsPDF();

  doc.text("Invoice", 14, 10);

  autoTable(doc, {
    head: [["Item", "Quantity", "Price", "Total"]],
    body: items.map((item) => [
      item.description,
      item.quantity,
      item.price,
      item.quantity * item.price,
    ]),
  });

  doc.save("invoice.pdf");
};


  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Invoice Generator
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {items.map((item, index) => (
          <Grid container spacing={2} alignItems="center" key={index} sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Description"
                value={item.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Quantity"
                value={item.quantity}
                onChange={(e) => handleChange(index, "quantity", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                value={item.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </Button>
            </Grid>
          </Grid>
        ))}

        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <Button variant="contained" onClick={handleAddItem}>
            Add Item
          </Button>
          <Button variant="contained" color="success" onClick={exportPDF}>
            Export to PDF
          </Button>
        </Box>

        <Typography variant="h6">Invoice Summary</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={3} align="right">
                <strong>Total:</strong>
              </TableCell>
              <TableCell>
                <strong>${getTotal()}</strong>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default InvoiceForm;
