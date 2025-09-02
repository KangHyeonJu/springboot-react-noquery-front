import { deleteCar, getCars } from "../api/carapi";
import {
  DataGrid,
  type GridCellParams,
  type GridColDef,
} from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Button, Snackbar, Stack } from "@mui/material";
import AddCar from "../components/Addcar";
import EditCar from "../components/EditCar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Car } from "../types";
import useAuthStore from "../store.ts";

export default function Carlist() {
  const { logout } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const loadCarData = () => {
    setIsLoading(true);
    getCars()
      .then((res) => {
        setData(res);
        setIsLoading(false);
        setIsError(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    loadCarData();
  }, []);

  const columns: GridColDef[] = [
    { field: "brand", headerName: "Brand", width: 200 },
    { field: "model", headerName: "Model", width: 200 },
    { field: "color", headerName: "Color", width: 200 },
    {
      field: "registrationNumber",
      headerName: "RegistrationNumber",
      width: 150,
    },
    { field: "modelYear", headerName: "ModelYear", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    {
      field: "edit",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditCar carData={params.row} loadCarData={loadCarData} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          onClick={async () => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`
              )
            ) {
              await deleteCar(params.row.id);
              loadCarData();
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  const handleLogout = () => {
    logout();
    sessionStorage.setItem("jwt", "");
  };

  if (isLoading) {
    return <span>Loading...</span>;
  } else if (isError) {
    return <span>Error when fetching cars...</span>;
  } else {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <AddCar loadCarData={loadCarData} />
          <Button onClick={handleLogout}>Log out</Button>
        </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick={true}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted"
        />
      </>
    );
  }
}
