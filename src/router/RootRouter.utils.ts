export const routesBook = {
  main: () => "/",
  noteList: () => "/notes",
  noteCreate: () => "/notes/new-note",
  noteDetails: (id = ":id") => `/notes/:${id}`,
};
