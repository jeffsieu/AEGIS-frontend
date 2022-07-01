import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useTheme } from '@mui/material';
import {
  DataGrid,
  GridColumns,
  GridValueFormatterParams,
  GridRowModes,
  GridRowModesModel,
  GridEventListener,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridRowId,
  GridRowsProp,
} from '@mui/x-data-grid';
import { Backend } from '@typing/backend';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export type Request = {
  id: number;
  callsign: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  type: Backend.RequestType;
};

export type RequestsTableProps = {
  requests: Request[];
  onRequestsUpdate: (requests: Request[]) => void;
};

export default function RequestsTable(props: RequestsTableProps) {
  const { onRequestsUpdate } = props;

  const theme = useTheme();
  const [rows, setRows] = useState<GridRowsProp>(props.requests);

  useEffect(() => {
    setRows(props.requests);
  }, [props.requests]);

  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    onRequestsUpdate(rows as Request[]);
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    onRequestsUpdate(newRows as Request[]);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columns: GridColumns = [
    {
      field: 'callsign',
      headerName: 'Callsign',
      width: 150,
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 200,
      editable: true,
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams<Date>) =>
        dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      editable: true,
      width: 200,
      type: 'date',
      valueFormatter: (params: GridValueFormatterParams<Date>) =>
        dayjs(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: ['Work', 'Personal'],
      editable: true,
    },
    {
      field: 'reason',
      headerName: 'Reason',
      flex: 1,
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save htmlColor={theme.palette.text.secondary} />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel htmlColor={theme.palette.text.secondary} />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit htmlColor={theme.palette.text.secondary} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete htmlColor={theme.palette.text.secondary} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
          />,
        ];
      },
    },
  ];

  return (
    <DataGrid
      autoHeight
      editMode="row"
      columns={columns}
      rows={rows}
      rowModesModel={rowModesModel}
      experimentalFeatures={{ newEditingApi: true }}
      onRowEditStart={handleRowEditStart}
      onRowEditStop={handleRowEditStop}
    />
  );
}
