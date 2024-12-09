import React from 'react';
import { Card, Typography, Box } from '@mui/material';

interface CityItemProps {
  id: number;
  name: string;
  province: number;
}

const CityItem: React.FC<CityItemProps> = ({ id, name, province }) => {
  return (
    <Card className="cityitem-card" style={{ marginBottom: '15px', padding: '10px', borderRadius: '8px' }}>
      <Box display="flex" flexDirection="column">
        <Typography variant="h6" className="cityitem-name">{name}</Typography>
        <Typography variant="body2" className="cityitem-province">Province: {province}</Typography>
      </Box>
    </Card>
  );
};

export default CityItem;
