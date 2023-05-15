import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';

function AnimalGrid() {

    const [animals, setAnimals] = useState([
        {
          id: 1,
          name: 'Fluffy',
          age: 2,
          breed: 'Domestic Short Hair',
          sex: 'Female',
          image: 'https://example.com/cat.jpg',
        },
        {
          id: 2,
          name: 'Buddy',
          age: 3,
          breed: 'Labrador Retriever',
          sex: 'Male',
          image: 'https://example.com/dog.jpg',
        },
        {
          id: 3,
          name: 'Thumper',
          age: 1,
          breed: 'Holland Lop',
          sex: 'Female',
          image: 'https://example.com/rabbit.jpg',
        },
        {
            id: 1,
            name: 'Fluffy',
            age: 2,
            breed: 'Domestic Short Hair',
            sex: 'Female',
            image: 'https://example.com/cat.jpg',
          },
          {
            id: 2,
            name: 'Buddy',
            age: 3,
            breed: 'Labrador Retriever',
            sex: 'Male',
            image: 'https://example.com/dog.jpg',
          },
          {
            id: 3,
            name: 'Thumper',
            age: 1,
            breed: 'Holland Lop',
            sex: 'Female',
            image: 'https://example.com/rabbit.jpg',
          },
          {
            id: 1,
            name: 'Fluffy',
            age: 2,
            breed: 'Domestic Short Hair',
            sex: 'Female',
            image: 'https://example.com/cat.jpg',
          },
          {
            id: 2,
            name: 'Buddy',
            age: 3,
            breed: 'Labrador Retriever',
            sex: 'Male',
            image: 'https://example.com/dog.jpg',
          },
          {
            id: 3,
            name: 'Thumper',
            age: 1,
            breed: 'Holland Lop',
            sex: 'Female',
            image: 'https://example.com/rabbit.jpg',
          },
      ]);

      return (
        <div style={{ paddingTop: "10rem", paddingBottom: "10rem" }}>
            <Typography variant="h2" sx={{ mb: 4, textAlign: 'center', paddingBottom: '5rem'}}>
                Adopt a Furry Friend
            </Typography>
            <Grid container spacing={8} sx={{ 
        paddingLeft: { xs: '1rem', md: '5rem', xl: '20rem' },
        paddingRight: { xs: '1rem', md: '5rem', xl: '20rem' },
      }}>
                {animals.map((animal) => (
                    <Grid item xs={12} sm={6} md={4} key={animal.id}>
                    <Card>
                        <CardMedia
                        component="img"
                        height="100rem"
                        image={animal.image}
                        alt={animal.name}
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {animal.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Age: {animal.age}<br/>
                            Breed: {animal.breed}<br/>
                            Sex: {animal.sex}
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Adopt {animal.name}
                        </Button>
                        </CardContent>
                    </Card>
                    </Grid>
                ))}
                </Grid>
        </div>

      );
}

export default AnimalGrid;