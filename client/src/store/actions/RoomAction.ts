import api from "@/configs/api";
import { ROOMS, SAVE_ROOM } from "../types";
import Room from "@/interfaces/Room";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

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

export const saveRoomAction = createAsyncThunk(
  SAVE_ROOM,
  async (room: Room) => {
    const id = toast.loading("Salvando quarto...");

    try {
      if (room.id) {
        await api.patch(`/rooms/${room.id}`, room);
      } else {
        await api.post("/rooms", room);
      }

      toast.update(id, {
        render: "Quarto salvo com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      return room;
    } catch (error) {
      toast.update(id, {
        render: "Erro ao salvar quarto",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }
);
