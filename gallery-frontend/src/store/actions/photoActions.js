import { push } from 'connected-react-router';
import {
  DELETE_PHOTO_SUCCESS,
  FETCH_PHOTOS_FAIL,
  FETCH_PHOTOS_SUCCESS, POST_PHOTO_FAIL,
  POST_PHOTO_SUCCESS, QUERY_PHOTOS_FAIL, QUERY_PHOTOS_SUCCESS,
} from '../actionTypes';
import axiosApi from '../../axios';

const fetchPhotosSuccess = (photos) => {
  return { type: FETCH_PHOTOS_SUCCESS, photos };
};

const fetchPhotosFail = (error) => {
  return { type: FETCH_PHOTOS_FAIL, error };
};

export const fetchPhotos = () => {
  return async dispatch => {
    try {
      const response = await axiosApi('/photos');
      dispatch(fetchPhotosSuccess(response.data));
    } catch (e) {
      dispatch(fetchPhotosFail(e));
    }
  };
};

const queryPhotosSuccess = (queryPhotos) => {
  return { type: QUERY_PHOTOS_SUCCESS, queryPhotos };
};

const queryPhotosFail = (error) => {
  return { type: QUERY_PHOTOS_FAIL, error };
};

export const queryPhotos = (id) => {
  return async dispatch => {
    try {
      const response = await axiosApi.get(`/photos?user=${id}`);
      dispatch(queryPhotosSuccess(response.data));
    } catch (e) {
      dispatch(queryPhotosFail(e));
    }
  };
};

const postPhotoSuccess = () => {
  return { type: POST_PHOTO_SUCCESS };
};

const postPhotoFail = (error) => {
  return { type: POST_PHOTO_FAIL, error };
};

export const postPhoto = (data) => {
  return async (dispatch, getState) => {

    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };
    try {
      await axiosApi.post('/photos', data, {headers});
      dispatch(postPhotoSuccess());
      dispatch(push('/'));
    } catch (e) {
      dispatch(postPhotoFail(e.response && e.response.data));
    }
  };
};

const deletePhotoSuccess = (id) => {
  return { type: DELETE_PHOTO_SUCCESS, id };
};

export const deletePhoto = (id) => {
  return async (dispatch, getState) => {
    const token = getState().user.userInfo.token;
    const headers = { 'Authorization': token };

    await axiosApi.delete(`/photos/${id}`, {headers});
    dispatch(deletePhotoSuccess(id));
  };
};