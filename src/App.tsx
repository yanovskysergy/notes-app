import { Provider as ReduxProvider } from "react-redux";
import { RootRouter } from "./router/RootRouter";
import { store } from "./store";

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <RootRouter />
    </ReduxProvider>
  );
};
