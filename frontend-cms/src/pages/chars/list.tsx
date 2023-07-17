import React from "react";
import {
  useDataGrid,
  EditButton,
  ShowButton,
  DeleteButton,
  List,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";

export const CharList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "charName",
        headerName: translate("char.fields.charName"),
        flex: 1,
        sortable: false,
        filterable: false,
      },
      {
        field: "isActive",
        headerName: translate("char.fields.isActive"),
        flex: 1,
        maxWidth: 100,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        valueFormatter: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        field: "createdAt",
        headerName: translate("char.fields.createdAt"),
        flex: 1,
        maxWidth: 220,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        valueFormatter: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        field: "updatedAt",
        headerName: translate("char.fields.updatedAt"),
        flex: 1,
        maxWidth: 220,
        align: "center",
        headerAlign: "center",
        sortable: false,
        filterable: false,
        valueFormatter: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        field: "actions",
        headerName: translate("table.actions"),
        sortable: false,
        filterable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 150,
      },
    ],
    [translate]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
