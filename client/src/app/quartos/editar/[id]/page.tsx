import RoomForm from "@/components/services/RoomForm";
import React from "react";

export default function EditRoomPage({ params }: { params: { id: number } }) {
  return (
    <div className="container">
      <h4>Edição de quarto</h4>
      <hr />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <RoomForm id={params.id} />
        </div>
      </div>
    </div>
  );
}
