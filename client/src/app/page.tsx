import RoomDataTable from "@/components/room/RoomDataTable";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

export default function RoomsPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <h4>
            Seja bem-vindo ao hotel <strong>Oásis Azul Hotel</strong>!
          </h4>
          <h6 className="text-muted">
            Abaixo encontra-se a lista de quartos cadastrados para reserva. Para
            reservar um quarto, clique no botão "Reservar" e preencha o
            formulário de reserva.
          </h6>
        </div>
        <div className="col-lg-2 col-md-3 my-auto">
          <div className="d-grid gap-2">
            <Link href="/quartos/novo" className="btn btn-primary">
              <FaPlus /> Adicionar quarto
            </Link>
          </div>
        </div>
      </div>
      <hr />
      <RoomDataTable />
    </div>
  );
}
