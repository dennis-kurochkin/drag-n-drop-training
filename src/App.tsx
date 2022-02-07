import React from 'react';
import './App.css';
import {Box, Grid, Paper, styled} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: '8px 0',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, background: '#E7EBF0', minHeight: '100vh' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>1</Item>
          <Item>2</Item>
          <Item>3</Item>
        </Grid>
        <Grid item xs={6}>
          <Item>4</Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
