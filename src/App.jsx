import "./styles/App.css";
import { ContextProvider } from "./context/ContextProvider";
import AppRoute from "./routes/AppRoute";

function App() {
  return (
    <ContextProvider>
      <AppRoute />
    </ContextProvider>
  );
}

export default App;
