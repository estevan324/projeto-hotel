import RoomDataTable from "@/components/room/RoomDataTable";

export default function RoomsPage() {
  return (
    <div className="container-fluid">
      <h4>
        Seja bem-vindo ao hotel <strong>Oásis Azul Hotel</strong>!
      </h4>
      <h6 className="text-muted">
        Abaixo encontra-se a lista de quartos cadastrados para reserva. Para
        reservar um quarto, clique no botão "Reservar" e preencha o formulário
        de reserva.
      </h6>
      <hr />
      <RoomDataTable />
    </div>
  );
}
