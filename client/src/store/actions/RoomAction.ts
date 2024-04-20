import api from "@/configs/api";
import { ROOMS } from "../types";
import Room from "@/interfaces/Room";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadRoomsAction = createAsyncThunk<Room[]>(ROOMS, async () => {
  const { data } = await api.get<Room[]>("/rooms");

  return data;
});
