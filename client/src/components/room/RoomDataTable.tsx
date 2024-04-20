"use client";

import Room from "@/interfaces/Room";
import { RootState } from "@/store";
import { loadRoomsAction } from "@/store/actions/RoomAction";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { FaPen, FaTrash } from "react-icons/fa";
import { connect } from "react-redux";
import DataTableComponent from "../utils/DataTableComponent";

const mapStateToProps = (state: RootState) => ({
  rooms: state.room.rooms || { rows: [], count: 0 },
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
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    loadRooms(pagination);
  }, [loadRooms, pagination]);

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
    {
      name: "Ações",
      cell: (row) => (
        <div className="row gap-2 justify-content-center align-items-center">
          <div className="col col-md-auto p-0">
            <Link
              href={`/quartos/${row.id}/editar`}
              className="btn btn-warning"
            >
              <FaPen />
            </Link>
          </div>
          <div className="col col-md-auto p-0 ">
            <button type="button" className="btn btn-danger">
              <FaTrash />
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <DataTableComponent<Room>
      data={rooms.rows}
      columns={columns}
      noDataComponent="Nenhum quarto cadastrado"
      paginationTotalRows={rooms.count}
      paginationPerPage={pagination.limit}
      paginationDefaultPage={pagination.page}
      onChangePage={(page) => setPagination({ ...pagination, page })}
      onChangeRowsPerPage={(limit) => setPagination({ ...pagination, limit })}
    />
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomDataTable);
