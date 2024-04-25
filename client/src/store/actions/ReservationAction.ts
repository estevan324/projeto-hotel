import { createAsyncThunk } from "@reduxjs/toolkit";
import Reservation from "@/interfaces/Reservation";
import {
  DELETE_RESERVATION,
  LOAD_RESERVATION_BY_ID,
  RESERVATIONS,
  SAVE_RESERVATION,
} from "../types";
import { toast } from "react-toastify";
import api from "@/configs/api";
import { AxiosError } from "axios";
import NestError from "@/interfaces/NestError";

interface LoadReservationsAction {
  page: number;
  limit: number;
  roomId?: number;
}

export const loadReservationsAction = createAsyncThunk(
  RESERVATIONS,
  async ({ page = 1, limit = 10, roomId }: LoadReservationsAction) => {
    const { data } = await api.get<{ rows: Reservation[]; count: number }>(
      "/reservations",
      {
        params: {
          page,
          limit,
          roomId,
        },
      }
    );

    return data;
  }
);

export const loadReservationByIdAction = createAsyncThunk(
  LOAD_RESERVATION_BY_ID,
  async (id: number) => {
    const { data } = await api.get<Reservation>(`/reservations/${id}`);

    return data;
  }
);

export const saveReservationAction = createAsyncThunk(
  SAVE_RESERVATION,
  async ({ reservation, id }: { reservation: Reservation; id?: number }) => {
    const t = toast.loading("Salvando reserva...");

    try {
      if (id) {
        await api.patch(`/reservations/${id}`, reservation);
      } else {
        await api.post("/reservations", reservation);
      }

      toast.update(t, {
        render: "Reserva salva com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      return reservation;
    } catch (error) {
      const err = error as AxiosError<NestError>;

      toast.update(t, {
        render: err.response?.data.message || "Erro ao salvar reserva",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      return Promise.reject(err);
    }
  }
);

export const deleteReservationAction = createAsyncThunk(
  DELETE_RESERVATION,
  async (id: number) => {
    const t = toast.loading("Deletando reserva...");

    try {
      await api.delete(`/reservations/${id}`);

      toast.update(t, {
        render: "Reserva deletada com sucesso!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      return id;
    } catch (error) {
      const err = error as AxiosError<NestError>;

      toast.update(t, {
        render: err.response?.data.message || "Erro ao deletar reserva",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });

      return Promise.reject(err);
    }
  }
);
