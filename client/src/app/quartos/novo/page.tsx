import React from "react";
import RoomForm from "@/components/services/RoomForm";

export default function CreateRoomPage() {
  return (
    <div className="container">
      <h4>Cadastrar novo quarto</h4>
      <hr />
      <div className="row">
        <div className="col-md-6 mx-auto">
          <RoomForm />
        </div>
      </div>
    </div>
  );
}
