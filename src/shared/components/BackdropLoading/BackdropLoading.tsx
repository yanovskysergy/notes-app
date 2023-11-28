import { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface BackdropLoadingProps {
  open: boolean;
}

export const BackdropLoading: FC<BackdropLoadingProps> = ({ open }) => {
  return (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  );
};
