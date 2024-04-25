import api from "@/configs/api";
import { DELETE_ROOM, LOAD_ROOM_BY_ID, ROOMS, SAVE_ROOM } from "../types";
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

export const loadRoomByIdAction = createAsyncThunk(
  LOAD_ROOM_BY_ID,
  async (id: number) => {
    const { data } = await api.get<Room>(`/rooms/${id}`);

    return data;
  }
);

export const saveRoomAction = createAsyncThunk(
  SAVE_ROOM,
  async ({ room, id }: { room: Room; id?: number }) => {
    const t = toast.loading("Salvando quarto...");

    try {
      if (id) {
        await api.patch(`/rooms/${id}`, room);
      } else {
        await api.post("/rooms", room);
      }

      toast.update(t, {
        render: "Quarto salvo com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      return room;
    } catch (error) {
      toast.update(t, {
        render: "Erro ao salvar quarto",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  }
);

export const resetRoomAction = () => ({
  type: `${SAVE_ROOM}/reset`,
});

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
