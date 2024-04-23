"use client";

import Room from "@/interfaces/Room";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ERROR_MESSAGES } from "@/configs/constants";

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

export default function RoomForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Room>({
    resolver: zodResolver(RoomFormSchema),
  });

  const handleFormSubmit: SubmitHandler<Room> = (data) => {
    console.log(data);
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
      <input
        type="submit"
        className="btn btn-primary"
        value="Cadastrar quarto"
      />
    </form>
  );
}
