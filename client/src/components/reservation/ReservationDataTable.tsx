"use client";

import Reservation from "@/interfaces/Reservation";
import { AppDispatch, RootState } from "@/store";
import {
  deleteReservationAction,
  loadReservationsAction,
} from "@/store/actions/ReservationAction";
import { bindActionCreators } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { connect } from "react-redux";
import DataTableComponent from "../utils/DataTableComponent";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import DeleteButton from "../utils/DeleteButton";
import dayjs from "dayjs";

const mapStateToProps = (state: RootState) => ({
  reservations: state.reservation.reservations || { rows: [], count: 0 },
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      loadReservations: loadReservationsAction,
      deleteReservation: deleteReservationAction,
    },
    dispatch
  );

interface StateProps extends ReturnType<typeof mapStateToProps> {}
interface DispatchProps extends ReturnType<typeof mapDispatchToProps> {}
interface ReservationDataTableProps extends StateProps, DispatchProps {
  roomId: number;
}

function ReservationDataTable({
  roomId,
  loadReservations,
  reservations,
  deleteReservation,
}: ReservationDataTableProps) {
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  useEffect(() => {
    loadReservations({ roomId, ...pagination });
  }, []);

  const columns: TableColumn<Reservation>[] = [
    {
      name: "Nome do hóspede",
      selector: (row) => row.guestName,
    },
    {
      name: "Data de entrada",
      cell: (row) => dayjs(row.checkIn).format("DD/MM/YYYY"),
    },
    {
      name: "Data de saída",
      cell: (row) => dayjs(row.checkOut).format("DD/MM/YYYY"),
    },
    {
      name: "Ações",
      cell: (row) => (
        <div className="row gap-2 justify-content-center align-items-center">
          <div className="col col-md-auto p-0">
            <Link
              href={`/reservas/editar/${row.id}`}
              className="btn btn-warning"
            >
              <FaPen />
            </Link>
          </div>
          <div className="col col-md-auto p-0 ">
            <DeleteButton
              handleDelete={() => row.id && deleteReservation(row.id)}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <DataTableComponent<Reservation>
      data={reservations.rows}
      columns={columns}
      noDataComponent="Nenhuma reserva encontrada"
      paginationTotalRows={reservations.count}
      paginationPerPage={pagination.limit}
      paginationDefaultPage={pagination.page}
      onChangePage={(page) => setPagination({ ...pagination, page })}
      onChangeRowsPerPage={(limit) => setPagination({ ...pagination, limit })}
    />
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReservationDataTable);
