import React, { useState } from "react";
import type { Car } from "../types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

interface AddCarProps {
  loadCarData: () => void;
}

export default function AddCar({ loadCarData }: AddCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<Car>({
    brand: "",
    model: "",
    color: "",
    registrationNumber: "",
    modelYear: 0,
    price: 0,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCar({ ...car, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    //addCar가 끝날 때까지 기다린 뒤에 loadCarData() 실행
    //await를 빼면 addCar가 끝나기도 전에 loadCarData()가 실행돼서, 서버는 새 데이터가 아직 저장 안 된 상태로 목록을 불러올 수 있음
    await addCar(car);

    loadCarData();
    setCar({
      brand: "",
      model: "",
      color: "",
      registrationNumber: "",
      modelYear: 0,
      price: 0,
    });
    handleClose();
  };

  return (
    <>
      <Button onClick={handleClickOpen}>New CAr</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
