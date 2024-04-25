import ReservationDataTable from "@/components/reservation/ReservationDataTable";
import React from "react";

export default function RoomReservationsPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div className="container">
      <h4>Reservas</h4>
      <hr />
      <ReservationDataTable roomId={params.id} />
    </div>
  );
}
