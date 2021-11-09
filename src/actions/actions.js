/** @format */

import { ActionTypes } from '../constants/actionsTypes';

export const setData = (data) => {
  return {
    type: ActionTypes.GET_DATA,
    payload: data,
  };
};
