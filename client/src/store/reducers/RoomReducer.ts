import Room from "@/interfaces/Room";
import { Action } from "@reduxjs/toolkit";

interface RoomState {
  rooms: Room[];
}

const initialState: RoomState = {
  rooms: [],
};

export default function RoomReducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
