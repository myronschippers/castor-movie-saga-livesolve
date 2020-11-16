import React, { Component } from 'react';
import { connect } from 'react-redux';

// MATERIAL-UI
import { Button, Container, Grid, Typography } from '@material-ui/core';

class DetailsPage extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MOVIE_DETAILS',
      payload: this.props.match.params.id,
    });
  }

  handleBack = (event) => {
    this.props.history.push('/');
  };

  render() {
    const { movieDetails } = this.props.store;

    return (
      <Container>
        <h2>Details</h2>
        <section>
          <Button onClick={this.handleBack} variant="contained" color="primary">
            Back to Movies
          </Button>
        </section>
        <section>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <img src={movieDetails.poster} alt={movieDetails.title} />
            </Grid>
            <Grid item xs={12} sm={9}>
              <Typography gutterBottom variant="h5" component="h2">
                {movieDetails.title}
              </Typography>
              <Typography gutterBottom variant="body1" component="p">
                {movieDetails.description}
              </Typography>
              <hr />
              <div>
                <Typography variant="h6" component="span">
                  Genre(s):{' '}
                </Typography>
                {movieDetails.genres != null &&
                  movieDetails.genres.map((item, index) => {
                    let comma =
                      index === movieDetails.genres.length - 1 ? '' : ',';

                    return (
                      <Typography variant="h6" component="span" key={index}>
                        {item.name}
                        {comma}{' '}
                      </Typography>
                    );
                  })}
              </div>
            </Grid>
          </Grid>
        </section>
      </Container>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    store: {
      movieDetails: store.movieDetails,
    },
  };
};

export default connect(mapStoreToProps)(DetailsPage);
