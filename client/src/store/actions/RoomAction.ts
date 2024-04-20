import api from "@/configs/api";
import { ROOMS } from "../types";
import Room from "@/interfaces/Room";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface LoadRoomsAction {
  page: number;
  limit: number;
}

export const loadRoomsAction = createAsyncThunk(
  ROOMS,
  async ({ page = 1, limit = 10 }: LoadRoomsAction) => {
    const { data } = await api.get<{ rows: Room[]; count: number }>("/rooms", {
      params: {
        page,
        limit,
      },
    });

    return data;
  }
);
