import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styling = (theme) =>
  createStyles({
    imgMedia: {
      height: '330px',
      backgroundSize: 'cover',
    },
  });

class MovieListItem extends Component {
  handleGoToDetails = (event) => {
    this.props.history.push(`/details/${this.props.movie.id}`);
  };

  render() {
    const { movie, classes } = this.props;

    return (
      <Card>
        <CardActionArea onClick={this.handleGoToDetails}>
          <CardMedia
            className={classes.imgMedia}
            image={movie.poster}
            title={movie.title}
          />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styling)(
  // connect to redux dispatch
  connect()(
    // for using this.props.history
    withRouter(MovieListItem)
  )
);
