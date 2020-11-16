import React, { Component } from 'react';
import { connect } from 'react-redux';

// MATERIAL-UI
import { Container } from '@material-ui/core';

import MovieList from '../../components/MovieList/MovieList';

class HomePage extends Component {
  render() {
    return (
      <Container>
        <h2>Home</h2>

        <MovieList />
      </Container>
    );
  }
}

export default connect()(HomePage);
