import Axios from 'axios';
import { takeLatest, put as dispatch } from 'redux-saga/effects';

function* getAllMovies(action) {
  try {
    const response = yield Axios.get('/api/movie');
    yield dispatch({
      type: 'SET_MOVIES',
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    yield dispatch({
      type: 'SET_ERROR',
      payload: 'There was an issue loading movies',
    });
  }
}

function* getMovieDetails(action) {
  try {
    const movieDetails = yield Axios.get(
      `/api/movie/details/${action.payload}`
    );
    yield dispatch({
      type: 'SET_MOVIE_DETAILS',
      payload: movieDetails.data,
    });
  } catch (err) {
    console.log(err);
    yield dispatch({
      type: 'SET_ERROR',
      payload: 'Could not get Movie Details!!!',
    });
  }
}

function* getMovieSaga() {
  yield takeLatest('GET_MOVIES', getAllMovies);
  yield takeLatest('GET_MOVIE_DETAILS', getMovieDetails);
}

export default getMovieSaga;
