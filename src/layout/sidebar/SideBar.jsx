import styles from "./sidebar.module.css";
import addTasksIcon from "../../../public/icons/Document Add.svg";
import settingIcon from "../../../public/icons/Settings.svg";
import tasksIcon from "../../../public/icons/Document Text.svg";
import { NavLink } from "react-router";

function SideBar({ isOpen }) {
  return (
    <aside className={styles.sidebar}>
      <h2>Task Man</h2>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={tasksIcon} alt="tasks icon image " loading="lazy" />
            <span>Tasks</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/add-task"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img
              src={addTasksIcon}
              alt="add task icon Description   image  "
              loading="lazy"
            />
            <span>Add Tasks</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="settings"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            <img src={settingIcon} alt="setting image " loading="lazy" />
            <span>Setting</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default SideBar;
