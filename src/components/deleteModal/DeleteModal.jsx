import styles from "./deleteModal.module.css";
import { createPortal } from "react-dom";
import { useContext } from "react";
import { tasksContext } from "../../context/useTasksContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function DeleteModal({ closeFunction, taskID }) {
  const { deleteTask, isLoading } = useContext(tasksContext);
  return createPortal(
    <>
      {<div className={styles.overlay}></div>}

      <ToastContainer />
      <div className={styles.content}>
        <span>Do you Want to Delet Task </span>
        <div>
          <button
            onClick={() => {
              deleteTask(taskID, closeFunction);
            }}
            disabled={isLoading}
          >
            Yes {isLoading && ".."}
          </button>
          <button onClick={() => closeFunction(false)} disabled={isLoading}>
            No
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default DeleteModal;
