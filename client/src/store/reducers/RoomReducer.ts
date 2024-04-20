import Room from "@/interfaces/Room";
import { PayloadAction } from "@reduxjs/toolkit";
import { ROOMS } from "../types";

interface RoomState {
  rooms: Room[];
}

const initialState: RoomState = {
  rooms: [],
};

export default function RoomReducer(
  state = initialState,
  action: PayloadAction
) {
  switch (action.type) {
    case `${ROOMS}/fulfilled`:
      return {
        ...state,
        rooms: action.payload,
      };
    default:
      return state;
  }
}
