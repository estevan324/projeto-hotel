import { combineReducers } from "@reduxjs/toolkit";
import ReservationReducer from "./ReservationReducer";
import RoomReducer from "./RoomReducer";

const rootReducer = combineReducers({
  reservation: ReservationReducer,
  room: RoomReducer,
});

export default rootReducer;
