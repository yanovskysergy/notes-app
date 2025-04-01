import { Backdrop, CircularProgress } from "@mui/material";

interface BackdropLoadingProps {
  open: boolean;
}

export const BackdropLoading = ({ open }: BackdropLoadingProps) => {
  return (
    <Backdrop open={open}>
      <CircularProgress />
    </Backdrop>
  );
};
