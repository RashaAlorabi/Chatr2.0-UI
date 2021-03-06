import * as actionTypes from "./actionTypes";
import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api-chatr.herokuapp.com/"
  //baseURL: "http://127.0.0.1:8000/"
  baseURL: "http://138.68.80.119/"
});
export const fetchChannelMessage = channelID => {
  return async dispatch => {
    const request = await instance.get(`channels/${channelID}/`);

    const response = request.data;
    dispatch({
      type: actionTypes.FETCH_CHANNEL_MESSAGE,
      payload: response
    });
  };
};

export const postChannelMessage = (userData, channelID, reset) => {
  return async dispatch => {
    try {
      const res = await instance.post(`channels/${channelID}/send/`, userData);
      const newMessage = res.data;

      dispatch({
        type: actionTypes.POST_CHANNEL_MESSAGE,
        payload: newMessage
      });
      reset();
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};

export const fetchMessagesByTimeStamp = (channelID, timestamp) => {
  return async dispatch => {
    const request = await instance.get(
      `channels/${channelID}/?latest=${timestamp}`
    );
    const response = request.data;

    dispatch({
      type: actionTypes.FETCH_MESSAGE_BY_TIME_STAMP,
      payload: response
    });
  };
};

export const fetchUserList = () => {
  return async dispatch => {
    const request = await instance.get(`channels/user/`);
    const response = request.data;

    dispatch({
      type: actionTypes.FETCH_USER_LIST,
      payload: response
    });
  };
};
