"use client";

import Room from "@/interfaces/Room";
import React, { use, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@/configs/constants";
import { connect, useDispatch } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import {
  loadRoomByIdAction,
  resetRoomAction,
  saveRoomAction,
} from "@/store/actions/RoomAction";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store";

const RoomFormSchema = z.object({
  number: z
    .number({
      invalid_type_error: ERROR_MESSAGES.mustBeNumber("Número do quarto"),
      required_error: ERROR_MESSAGES.required("Número do quarto"),
    })
    .min(1, { message: ERROR_MESSAGES.min(1) }),
  type: z
    .string({
      required_error: ERROR_MESSAGES.required("Tipo de quarto"),
    })
    .min(2, { message: ERROR_MESSAGES.minChar(2) }),
  pricePerNight: z
    .number({
      invalid_type_error: ERROR_MESSAGES.mustBeNumber("Preço por noite"),
      required_error: ERROR_MESSAGES.required("Preço por noite"),
    })
    .min(1, { message: ERROR_MESSAGES.min(1) }),
});

const mapStateToProps = (state: RootState) => ({
  room: state.room.room,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadRoomById: loadRoomByIdAction,
      resetRoom: resetRoomAction,
    },
    dispatch
  );

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapDispatchToProps> {}
interface RoomFormProps extends StateProps, DispatchProps {
  id?: number;
}

function RoomForm({ id, room, loadRoomById, resetRoom }: RoomFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<Room>({
    resolver: zodResolver(RoomFormSchema),
  });

  const router = useRouter();

  useEffect(() => {
    if (id) {
      loadRoomById(id);
    }
  }, [id]);

  useEffect(() => {
    if (room) {
      setValue("number", room.number);
      setValue("type", room.type);
      setValue("pricePerNight", room.pricePerNight);
    }
  }, [room]);

  useEffect(() => {
    return () => {
      resetRoom();
    };
  }, []);

  const dispatch: AppDispatch = useDispatch();
  const handleFormSubmit: SubmitHandler<Room> = async (data) => {
    const result = await dispatch(saveRoomAction({ room: data, id }));

    if (result.type.includes("fulfilled")) {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Número do quarto
        </label>
        <input
          type="number"
          className="form-control"
          id="number"
          {...register("number", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
          autoComplete="off"
        />
        <div className="d-block invalid-feedback">
          {errors.number && errors.number.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Tipo de quarto
        </label>
        <input
          type="text"
          className="form-control"
          id="type"
          {...register("type", { required: true })}
          autoComplete="off"
        />
        <div className="d-block invalid-feedback">
          {errors.type && errors.type.message}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="pricePerNight" className="form-label">
          Preço por noite
        </label>
        <input
          type="number"
          className="form-control"
          id="pricePerNight"
          {...register("pricePerNight", {
            required: true,
            min: 1,
            valueAsNumber: true,
          })}
          autoComplete="off"
        />
        <div className="d-block invalid-feedback">
          {errors.pricePerNight && errors.pricePerNight.message}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-2 col-md-3">
          <div className="d-grid">
            <input
              type="submit"
              className="btn btn-primary"
              value="Salvar quarto"
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomForm);
