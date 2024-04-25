import { createAsyncThunk } from "@reduxjs/toolkit";
import Reservation from "@/interfaces/Reservation";
import { SAVE_RESERVATION } from "../types";
import { toast } from "react-toastify";
import api from "@/configs/api";
import { AxiosError } from "axios";
import NestError from "@/interfaces/NestError";

export const saveReservationAction = createAsyncThunk(
  SAVE_RESERVATION,
  async ({ reservation, id }: { reservation: Reservation; id?: number }) => {
    const t = toast.loading("Salvando reserva...");

    try {
      if (id) {
        await api.patch(`/reservation/${id}`, reservation);
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
