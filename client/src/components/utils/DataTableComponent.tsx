"use client";

import DataTable, {
  PaginationOptions,
  TableColumn,
} from "react-data-table-component";

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  noDataComponent?: React.ReactNode;
  paginationTotalRows?: number;
  paginationDefaultPage?: number;
  paginationPerPage?: number;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (limit: number) => void;
}

export default function DataTableComponent<T>({
  data,
  columns,
  noDataComponent,
  paginationTotalRows,
  paginationDefaultPage,
  paginationPerPage,
  onChangePage,
  onChangeRowsPerPage,
}: DataTableProps<T>) {
  return (
    <DataTable<T>
      data={data}
      columns={columns}
      noDataComponent={noDataComponent}
      pagination
      paginationServer
      paginationTotalRows={paginationTotalRows}
      paginationDefaultPage={paginationDefaultPage}
      paginationPerPage={paginationPerPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      paginationComponentOptions={{
        rowsPerPageText: "Registros por página",
        rangeSeparatorText: "de",
        noRowsPerPage: false,
        selectAllRowsItem: false,
      }}
      customStyles={{
        rows: {
          style: {
            padding: "0.5rem",
          },
        },
      }}
    />
  );
}
