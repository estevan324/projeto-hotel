"use client";

import Room from "@/interfaces/Room";
import DataTable, { TableColumn } from "react-data-table-component";

export default function RoomDataTable() {
  const columns: TableColumn<Room>[] = [
    {
      name: "Número",
      selector: (row) => row.number,
    },
    {
      name: "Tipo",
      selector: (row) => row.type,
    },
    {
      name: "Preço por noite",
      selector: (row) => row.pricePerNight,
    },
  ];

  return (
    <DataTable
      data={[]}
      columns={columns}
      noDataComponent="Nenhum quarto cadastrado"
    />
  );
}
