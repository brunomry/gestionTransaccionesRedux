import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./router/AppRouter";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Menu from "./components/common/Menu";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </>
  );
}

export default App;
