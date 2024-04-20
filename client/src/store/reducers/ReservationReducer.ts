import Reservation from "@/interfaces/Reservation";
import { Action } from "@reduxjs/toolkit";

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations: [],
};

export default function ReservationReducer(
  state = initialState,
  action: Action
) {
  switch (action.type) {
    default:
      return state;
  }
}
