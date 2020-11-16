import React, { Component } from 'react';
import { connect } from 'react-redux';

// MATERIAL-UI
import { Grid } from '@material-ui/core';

// CUSTOM COMPONENT
import MovieListItem from '../MovieListItem/MovieListItem';

class MovieList extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_MOVIES',
    });
  }

  render() {
    return (
      <Grid container spacing={3}>
        {this.props.store.movies.map((item, index) => {
          return (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MovieListItem movie={item} />
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const mapStoreToProps = (store) => {
  return {
    store: {
      movies: store.movies,
    },
  };
};

export default connect(mapStoreToProps)(MovieList);
