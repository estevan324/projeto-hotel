"use client";

import Room from "@/interfaces/Room";
import { RootState } from "@/store";
import { loadRoomsAction } from "@/store/actions/RoomAction";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  rooms: state.room.rooms || [],
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      loadRooms: loadRoomsAction,
    },
    dispatch
  );

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapDispatchToProps> {}
interface RoomDataTableProps extends StateProps, DispatchProps {}

function RoomDataTable({ loadRooms, rooms }: RoomDataTableProps) {
  useEffect(() => {
    loadRooms();
  }, []);

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
      cell: (row) =>
        row.pricePerNight.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
    },
  ];

  return (
    <DataTable
      data={rooms}
      columns={columns}
      noDataComponent="Nenhum quarto cadastrado"
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDataTable);
