import { lazy } from "react";
import { useRoutes } from "react-router-dom";

const AllTasks = lazy((_) => import("../pages/allTasks/AllTasks"));
const Settings = lazy((_) => import("../pages/settings/Settings"));
const AddTask = lazy((_) => import("../pages/addTask/AddTask"));
const TaskDetails = lazy((_) => import("../pages/taskDetails/TaskDetails"));
const NotFound = lazy((_) => import("../pages/not-found/NotFound"));

const useHandleRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <AllTasks /> },
    { path: "/settings", element: <Settings /> },
    { path: "/add-task", element: <AddTask /> },
    { path: "/task/:taskId", element: <TaskDetails /> },
    { path: "*", element: <NotFound /> },
  ]);
  return { routes };
};
export default useHandleRoutes;
