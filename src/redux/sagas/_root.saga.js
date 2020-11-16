import { all } from 'redux-saga/effects';

// sagas
import movieSagas from './movies.saga';

function* rootSaga() {
  yield all([movieSagas()]);
}

export default rootSaga;
