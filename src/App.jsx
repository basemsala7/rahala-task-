import { Fragment, Suspense } from "react";
import { useAxiosConfig } from "./assets/js/axiosConfig";
import Loading from "./layout/loading/Loading";
import "./App.css";
import SideBar from "./layout/sidebar/SideBar";
import useHandleRoutes from "./routes/routes";
import { TaskProvider } from "./context/useTasksContext";
function App() {
  const { routes } = useHandleRoutes();
  const {} = useAxiosConfig();
  return (
    <Fragment>
      <div className="layout">
        <SideBar />
        <Suspense fallback={<Loading />}>
          <TaskProvider>
            <main>{routes}</main>
          </TaskProvider>
        </Suspense>
      </div>
    </Fragment>
  );
}

export default App;
