import {
  DELETE_PHOTO_SUCCESS,
  FETCH_PHOTOS_FAIL,
  FETCH_PHOTOS_SUCCESS, POST_PHOTO_FAIL, QUERY_PHOTOS_FAIL,
  QUERY_PHOTOS_SUCCESS,
} from '../actionTypes';

const initialState = {
  error: null,
  photos: null,
  queryPhotos: null,
};

const photoReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PHOTOS_SUCCESS:
      return { ...state, photos: action.photos };
    case FETCH_PHOTOS_FAIL:
      return { ...state, error: action.error };
    case POST_PHOTO_FAIL:
      return { ...state, error: action.error };
    case QUERY_PHOTOS_SUCCESS:
      return { ...state, queryPhotos: action.queryPhotos };
    case QUERY_PHOTOS_FAIL:
      return { ...state, error: action.error };
    case DELETE_PHOTO_SUCCESS:
      return {
        ...state,
        queryPhotos: state.queryPhotos.filter(photo => photo._id !== action.id),
      };
    default:
      return state;
  }
};

export default photoReducers;