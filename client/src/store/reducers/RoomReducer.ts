import Room from "@/interfaces/Room";
import { PayloadAction } from "@reduxjs/toolkit";

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
    default:
      return state;
  }
}
