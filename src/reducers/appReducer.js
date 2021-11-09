/** @format */

import { ActionTypes } from '../constants/actionsTypes';
import symbols from '../data.json';

const intialState = {
  data: symbols,
};

export const AppReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_DATA:
      return { ...state, data: payload };
    default:
      return state;
  }
};
