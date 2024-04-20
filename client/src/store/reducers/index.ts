import ReservationReducer from "./ReservationReducer";
import RoomReducer from "./RoomReducer";

const rootReducer = {
  reservation: ReservationReducer,
  room: RoomReducer,
};

export default rootReducer;
