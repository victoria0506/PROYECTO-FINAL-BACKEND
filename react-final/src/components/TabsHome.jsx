import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../style/TabsHome.css'; // Importa el archivo CSS

export default function TabsHome() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="tabs-container">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        className="tabs-scrollable"
      >
        <Tab label="Comida Tradicional" />
        <Tab label="Comida Internacional" />
        <Tab label="Mariscos" />
        <Tab label="Comida Rapida" />
        <Tab label="Comida Gourmet" />
        <Tab label="Ensaladas" />
   
      </Tabs>
    </Box>
  );
}

