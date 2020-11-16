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

function* getMovieSaga() {
  yield takeLatest('GET_MOVIES', getAllMovies);
}

export default getMovieSaga;
