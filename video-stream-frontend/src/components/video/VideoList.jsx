import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VideoList({ setLoggedIn }) {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('http://localhost:5000/api/v1/videos', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                });
                setVideos(data);
            } catch {
                setLoggedIn(false);
                navigate('/');
            }
        }
        fetchData();
    }, [navigate, setLoggedIn]);

    return (
        <>
            <Container>
                <Typography variant="h4" style={{ color: '#2196F3', marginBottom: '16px',marginTop:"16px" }}>
                    Video Gallery
                </Typography>
                <hr/>
                <Grid container spacing={2} marginTop={2}>
                    {videos.map((video) => (
                        <Grid item xs={12} md={4} key={video._id}>
                            <CardActionArea component="a" href="#">
                                <Card sx={{ display: 'flex', border: '2px solid #2196F3', borderRadius: '8px' }}>
                                    <CardContent sx={{ flex: 1 }}>
                                        <Typography component="h2" variant="h5">
                                            <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: '#2196F3' }}>
                                                {video.title}
                                            </Link>
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.secondary">
                                            {video.uploadDate}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                                        image={`http://127.0.0.1:5000/${video.coverImage}`}
                                        alt="alt"
                                    />
                                </Card>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}
