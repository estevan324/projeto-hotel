import Room from "@/interfaces/Room";
import { PayloadAction } from "@reduxjs/toolkit";
import { DELETE_ROOM, LOAD_ROOM_BY_ID, ROOMS, SAVE_ROOM } from "../types";

interface RoomState {
  rooms: {
    count: number;
    rows: Room[];
  };
  room: Room | null;
}

const initialState: RoomState = {
  rooms: {
    count: 0,
    rows: [],
  },
  room: null,
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
    case `${SAVE_ROOM}/reset`: {
      return {
        ...state,
        room: initialState.room,
      };
    }
    case `${LOAD_ROOM_BY_ID}/fulfilled`: {
      return {
        ...state,
        room: action.payload,
      };
    }
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
