import Room from "@/interfaces/Room";
import { PayloadAction } from "@reduxjs/toolkit";
import { DELETE_ROOM, ROOMS } from "../types";

interface RoomState {
  rooms: {
    count: number;
    rows: Room[];
  };
}

const initialState: RoomState = {
  rooms: {
    count: 0,
    rows: [],
  },
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
    case `${DELETE_ROOM}/fulfilled`:
      const id = action.payload as unknown as number;

      return {
        ...state,
        rooms: {
          ...state.rooms,
          rows: state.rooms.rows.filter((room) => room.id !== id),
        },
      };
    default:
      return state;
  }
}
