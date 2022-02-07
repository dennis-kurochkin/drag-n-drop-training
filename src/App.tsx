import React, {useState} from 'react';
import './App.css';
import {Box, Grid, Paper, styled} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: '8px 0',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const data = [
  [1, 2, 3],
  [4, 5]
]

const App = () => {
  const [draggingElement, setDraggingElement] = useState<HTMLDivElement | null>(null)

  const handleContainerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement
    const container = target.classList.contains('drag-in-column') ? target : target.closest('.drag-in-column')

    if (container) {
      container.appendChild(draggingElement!)
    }
  }

  const handleItemDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingElement(e.currentTarget)
    e.currentTarget.style.opacity = '0.5'
  }

  const handleItemDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    setDraggingElement(null)
    e.currentTarget.style.opacity = '1'
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 3, background: '#E7EBF0', minHeight: '100vh', boxSizing: 'border-box' }}>
      <Grid
        spacing={2}
        container
        onDragOver={handleContainerDragOver}
        onDrop={handleDrop}
      >
        {data.map((column, columnIndex) => (
          <Grid
            key={columnIndex}
            xs={6}
            className={'drag-in-column'}
            item
          >
            {column.map((cell, cellIndex) => (
              <Item
                key={`${columnIndex}${cellIndex}`}
                draggable
                onDragStart={handleItemDragStart}
                onDragEnd={handleItemDragEnd}
              >
                {cell}
              </Item>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
