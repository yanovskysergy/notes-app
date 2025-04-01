import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { NotFoundPage } from "@/pages/404";
import { NotesPage } from "@/pages/Notes";
import { NoteCreatePage } from "@/pages/Notes/NoteCreatePage";
import { NoteDetailsPage } from "@/pages/Notes/NoteDetailsPage";
import { routesBook } from "./RootRouter.utils";

export const RootRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routesBook.main()}
          element={<Navigate to={routesBook.noteList()} replace />}
        />
        <Route path={routesBook.noteList()} element={<NotesPage />} />
        <Route path={routesBook.noteCreate()} element={<NoteCreatePage />} />
        <Route path={routesBook.noteDetails()} element={<NoteDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
