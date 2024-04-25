"use client";

import { ERROR_MESSAGES } from "@/configs/constants";
import Reservation from "@/interfaces/Reservation";
import { AppDispatch } from "@/store";
import { saveReservationAction } from "@/store/actions/ReservationAction";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { connect, useDispatch } from "react-redux";
import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const ReservationFormSchema = z.object({
  guestName: z
    .string({
      required_error: ERROR_MESSAGES.required("Nome do hóspede"),
    })
    .min(3, { message: ERROR_MESSAGES.minChar(3) }),
  checkIn: z.string().regex(dateRegex, {
    message: ERROR_MESSAGES.mustBeDate("Data de entrada"),
  }),
  checkOut: z.string().regex(dateRegex, {
    message: ERROR_MESSAGES.mustBeDate("Data de saída"),
  }),
  roomId: z.number(),
});

interface ReservationFormProps {
  roomId: number;
}

function ReservationForm({ roomId }: ReservationFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Reservation>({
    resolver: zodResolver(ReservationFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    setValue("roomId", Number(roomId));
  }, [roomId]);

  const dispatch: AppDispatch = useDispatch();
  const handleSubmitForm: SubmitHandler<Reservation> = async (data) => {
    const result = await dispatch(saveReservationAction({ reservation: data }));

    if (result.type.includes("fulfilled")) {
      router.back();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="mb-3">
        <label htmlFor="guestName" className="form-label">
          Nome do hóspede
        </label>
        <input
          type="text"
          className="form-control"
          id="guestName"
          {...register("guestName")}
          autoComplete="off"
        />
        <div className="d-block invalid-feedback">
          {errors.guestName && errors.guestName.message}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="checkIn" className="form-label">
              Data de entrada
            </label>
            <input
              type="date"
              className="form-control"
              id="checkIn"
              {...register("checkIn")}
            />
            <div className="d-block invalid-feedback">
              {errors.checkIn && errors.checkIn.message}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="checkOut" className="form-label">
              Data de saída
            </label>
            <input
              type="date"
              className="form-control"
              id="checkOut"
              {...register("checkOut")}
            />
            <div className="d-block invalid-feedback">
              {errors.checkOut && errors.checkOut.message}
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-3">
          <input type="submit" className="btn btn-primary" value="Salvar" />
        </div>
      </div>
    </form>
  );
}

export default connect(null, null)(ReservationForm);
