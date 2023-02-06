import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function ActionAreaCard() {
  return (
    <div className="card-wrapper">
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia className="card-media" component="img" height="140" image="/assets/Images/tokyo.png" alt="Tokyo" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Tokyo
            </Typography>
            <Typography variant="body1" color="text.secondary">
              The capital of Japan
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            className="card-media"
            component="img"
            height="140"
            image="/assets/Images/bangkok.png"
            alt="Tokyo"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Bangkok
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The capital of Thailand
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
