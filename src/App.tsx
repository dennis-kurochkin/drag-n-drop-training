import React, {useState} from 'react';
import './App.css';
import {Box, Grid, Paper, styled} from "@mui/material";
import {cloneDeep} from "lodash";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: '0',
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const App = () => {
  const [draggingElement, setDraggingElement] = useState<{ el: HTMLDivElement, columnIndex: number, cellIndex: number} | null>(null)
  const [data, setData] = useState([
    ['Roses are red,', 'violets are blue', 'I don\'t sleep at night', 'trapped in this bed', 'just to see you again.'],
    ['\'cause I\'m thinking of you', 'Alone with my thoughts,', 'Know I\'d give the world']
  ])

  const handleContainerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const container = (e.target as HTMLDivElement).closest('.drag-in-column') as HTMLDivElement
    const shouldPlaceUp = e.clientY - e.currentTarget.getBoundingClientRect().y <= e.currentTarget.offsetHeight / 2

    if (draggingElement?.el === e.currentTarget) {
      return
    }

    if (container && container.dataset.columnIndex && e.currentTarget.dataset.cellIndex && draggingElement) {
      const elementToAdd = data[draggingElement.columnIndex][draggingElement.cellIndex]
      const isCurrentContainer = Number(container.dataset.columnIndex) === draggingElement.columnIndex
      const isLastElementInColumn = Number(draggingElement.cellIndex) + 1 === data[draggingElement.columnIndex].length
      const addingStartIndex = Number(e.currentTarget.dataset.cellIndex) + (shouldPlaceUp ? 0 : 1) - (isCurrentContainer && !isLastElementInColumn ? 1 : 0)

      const newData = cloneDeep(data)

      console.log({ shouldPlaceUp, addingStartIndex, isCurrentContainer, isLastElementInColumn })

      newData[draggingElement.columnIndex].splice(draggingElement.cellIndex, 1)
      newData[Number(container.dataset.columnIndex)].splice(addingStartIndex === -1 ? 0 : addingStartIndex, 0, elementToAdd)

      setData(newData)
    }
  }

  const handleItemDragStart = (columnIndex: number, cellIndex: number, e: React.DragEvent<HTMLDivElement>) => {
    setDraggingElement({el: e.currentTarget, columnIndex, cellIndex})
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
      >
        {data.map((column, columnIndex) => (
          <Grid
            key={columnIndex}
            data-column-index={columnIndex}
            xs={6}
            className={'drag-in-column'}
            item
          >
            {column.map((cell, cellIndex) => (
              <div
                key={`${columnIndex}${cellIndex}`}
                data-cell-index={cellIndex}
                style={{ padding: '4px 0' }}
                draggable
                onDragOver={handleContainerDragOver}
                onDrop={handleDrop}
                onDragStart={(...args) => handleItemDragStart(columnIndex, cellIndex, ...args)}
                onDragEnd={handleItemDragEnd}
              >
                <Item
                >
                  {cell}
                </Item>
              </div>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;
