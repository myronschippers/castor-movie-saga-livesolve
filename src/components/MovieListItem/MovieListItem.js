import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  render() {
    const { movie, classes } = this.props;

    return (
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.imgMedia}
            image={movie.poster}
            title={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}

export default withStyles(styling)(connect()(MovieListItem));
