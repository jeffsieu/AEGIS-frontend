import MultiDatePicker from '@components/general/multi-date-picker';
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
  GridRowModel,
  GridRenderEditCellParams,
  useGridApiContext,
  GridComparatorFn
} from '@mui/x-data-grid';
import { Backend } from '@typing/backend';
import { dateRangesToString, getDateRanges } from '@utils/helpers/dateRange';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export type Request = {
  id: number;
  callsign: string;
  dates: Date[];
} & Omit<Backend.Request, 'memberId' | 'dates'>;

export type RequestsTableProps = {
  requests: Request[];
  members: Backend.Entry<Backend.Member>[];
  onRequestsUpdate: (requests: Request[]) => void;
};

function MultiDatePickerEditComponent(props: GridRenderEditCellParams<Date[]>) {
  const { id, field, value } = props;
  const apiRef = useGridApiContext();

  return (
    <MultiDatePicker
      label={''}
      selection={value!.map((date) => dayjs(date))}
      onSelectionChanged={(selection) => {
        apiRef.current.setEditCellValue({
          id,
          field,
          value: selection.map((date) => date.toDate()),
        });
      }}
    />
  );
}

// Function to sort request date by start date
const requestDateComparator: GridComparatorFn<Date[]> = (v1, v2) => 
  v1[0].getDate() - v2[0].getDate();

export default function RequestsTable(props: RequestsTableProps) {
  const { members, onRequestsUpdate } = props;

  const theme = useTheme();
  const [rows, setRows] = useState<GridRowsProp<Request>>(props.requests);

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
  };

  const processRowUpdate = async (newRow: GridRowModel<Request>) => {
    const newRows = rows.map((row) => {
      if (row.id === newRow.id) {
        return newRow;
      }
      return row;
    });
    onRequestsUpdate(newRows);
    return newRow;
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    const newRows = rows.filter((row) => row.id !== id);
    setRows(newRows);
    onRequestsUpdate(newRows);
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const columns: GridColumns = [
    {
      field: 'callsign',
      headerName: 'Callsign',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: members.map((member) => member.callsign),
    },
    {
      field: 'type',
      headerName: 'Type',
      type: 'singleSelect',
      valueOptions: ['Work', 'Personal'],
      editable: true,
    },
    {
      field: 'dates',
      headerName: 'Dates',
      flex: 1,
      editable: true,
      valueFormatter: (params: GridValueFormatterParams<Date[]>) => {
        return dateRangesToString(getDateRanges(params.value));
      },
      renderEditCell: (params: GridRenderEditCellParams<Date[]>) => {
        return <MultiDatePickerEditComponent {...params} />;
      },
      sortComparator: requestDateComparator,
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
      processRowUpdate={processRowUpdate}
      rowModesModel={rowModesModel}
      experimentalFeatures={{ newEditingApi: true }}
      onRowEditStart={handleRowEditStart}
      onRowEditStop={handleRowEditStop}
      initialState={{
        sorting: {
          sortModel: [
            { field: 'callsign', sort:'asc'},
            {field: 'dates', sort:'asc'}
          ]
        }
      }}
    />
  );
}
