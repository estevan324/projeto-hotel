import ReservationForm from "@/components/services/ReservationForm";
import React from "react";

export default function EditReservationPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className="container">
      <h4>Edição de Reserva</h4>
      <hr />
      <ReservationForm id={params.id} />
    </div>
  );
}
