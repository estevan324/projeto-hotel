import api from "@/configs/api";
import { DELETE_ROOM, ROOMS, SAVE_ROOM } from "../types";
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

export const deleteRoomAction = createAsyncThunk(
  DELETE_ROOM,
  async (id: number) => {
    const toastId = toast.loading("Excluindo quarto...");

    try {
      await api.delete(`/rooms/${id}`);

      toast.update(toastId, {
        render: "Quarto excluído com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      return id;
    } catch (error) {
      toast.update(toastId, {
        render: "Erro ao excluir quarto",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }
);
