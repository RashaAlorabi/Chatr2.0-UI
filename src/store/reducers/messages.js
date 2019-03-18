import * as actionTypes from "../actions/actionTypes";
const initialState = {
  channel_Messages: [],
  filter_msg: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNEL_MESSAGE:
      return {
        ...state,
        //it's one object

        channel_Messages: action.payload
      };
    case actionTypes.POST_CHANNEL_MESSAGE:
      return {
        ...state,
        channel_Messages: state.channel_Messages.concat(action.payload)
      };
    case actionTypes.FETCH_MESSAGE_BY_TIME_STAMP:
      return {
        ...state,
        filter_msg: state.channel_Messages.concat(action.payload)
      };
    default:
      return state;
  }
};

export default reducer;
