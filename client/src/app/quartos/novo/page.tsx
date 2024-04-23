import React from "react";
import RoomForm from "@/components/services/RoomForm";

export default function CreateRoomPage() {
  return (
    <div className="container">
      <h4>Cadastrar novo quarto</h4>
      <hr />
      <RoomForm />
    </div>
  );
}
