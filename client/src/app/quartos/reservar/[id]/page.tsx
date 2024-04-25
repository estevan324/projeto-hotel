import ReservationForm from "@/components/services/ReservationForm";
import React from "react";

export default function ReservationPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className="container">
      <h4>Reservar quarto</h4>
      <hr />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <ReservationForm roomId={params.id} />
        </div>
      </div>
    </div>
  );
}
