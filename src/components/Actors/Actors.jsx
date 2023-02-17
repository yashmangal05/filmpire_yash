import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

import usestyles from './styles';
import { useGetActorsDetailsQuery, useGetMoviesyActorIdQuery } from '../../services/TMDB';
import { MovieList, Pagination } from '..';

const Actors = () => {
    const { id } = useParams();
    const history = useHistory();
    const classes = usestyles();
    const [page, setPage] = useState(1);

    const { data, isFetching, error } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesyActorIdQuery({ id, page });

    if (isFetching) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center">
                <Button startIcon={<ArrowBack />} onClick={() => history.goBack} color="primary">
                    Go Back
                </Button>
            </Box >
        );
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item lg={5} xl={4}>
                    <img
                        className={classes.image}
                        src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
                        alt={data.name}
                    />
                </Grid>
                <Grid item lg={7} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h2" gutterBottom>
                        {data?.name}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Born: {new Date(data?.birthday).toDateString()}
                    </Typography>
                    <Typography variant="body1" align="justify" paragraph>
                        {data?.biography || 'Sorry, no biography yet...'}
                    </Typography>
                    <Box marginTop="2rem" display="flex" justifyContent="space-around">
                        <Button variant="contained" color="primary" target="_blank" href={`https://www.imdb.com/name/${data?.imdb_id}`} >
                            IMDB
                        </Button>
                        <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
                            BACK
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Box margin='2rem 0'>
                <Typography variant="h2" gutterBottom align="center">Movies</Typography>
                {movies && <MovieList movies={movies} numberOfMovies={12} />}
                <Pagination currentPage={page} setPage={setPage} totalPages={movies?.total_pages} />
            </Box>
        </>
    );
};

export default Actors;