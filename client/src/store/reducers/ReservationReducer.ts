import Reservation from "@/interfaces/Reservation";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  DELETE_RESERVATION,
  LOAD_RESERVATION_BY_ID,
  RESERVATIONS,
} from "../types";

interface ReservationState {
  reservations: { count: number; rows: Reservation[] };
  reservation: Reservation | null;
}

const initialState: ReservationState = {
  reservations: { count: 0, rows: [] },
  reservation: null,
};

export default function ReservationReducer(
  state = initialState,
  action: PayloadAction
) {
  switch (action.type) {
    case `${RESERVATIONS}/fulfilled`:
      return {
        ...state,
        reservations: action.payload,
      };
    case `${LOAD_RESERVATION_BY_ID}/fulfilled`:
      return {
        ...state,
        reservation: action.payload,
      };
    case `${DELETE_RESERVATION}/fulfilled`:
      return {
        ...state,
        reservations: {
          ...state.reservations,
          rows: state.reservations.rows.filter(
            (reservation) => reservation.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
}
