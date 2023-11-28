import { Navigate, Route, Routes } from "react-router-dom";
import { NoPageFound } from "@/pages/404";
import { Notes } from "@/pages/Notes";
import { CreateNote } from "@/pages/Notes/CreateNote";
import { NoteDetails } from "@/pages/Notes/NoteDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/notes" replace />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/notes/new-note" element={<CreateNote />} />
      <Route path="/notes/:id" element={<NoteDetails />} />
      <Route path="*" element={<NoPageFound />} />
    </Routes>
  );
}

export default App;
