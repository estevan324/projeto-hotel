import Reservation from "@/interfaces/Reservation";
import { PayloadAction } from "@reduxjs/toolkit";

interface ReservationState {
  reservations: Reservation[];
}

const initialState: ReservationState = {
  reservations: [],
};

export default function ReservationReducer(
  state = initialState,
  action: PayloadAction
) {
  switch (action.type) {
    default:
      return state;
  }
}
