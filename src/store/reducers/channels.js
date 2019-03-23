import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channels: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CHANNELS:
      return {
        ...state,
        channels: state.channels.concat(action.payload)
      };
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channels: action.payload
      };

    case actionTypes.JOIN_CHANNEL:
      return {
        ...state,
        channels: state.channels.map(channel =>
          channel.id === action.payload.id ? action.payload : channel
        )
      };
    case actionTypes.UNJOIN_CHANNEL:
      return {
        ...state,
        channels: state.channels.map(channel =>
          channel.id === action.payload.id ? action.payload : channel
        )
      };

    default:
      return state;
  }
};

export default reducer;
