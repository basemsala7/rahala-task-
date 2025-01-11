import styles from "./taskCard.module.css";
import updateIcon from "../../../public/icons/Vector.svg";
import viewIcon from "../../../public/icons/view.svg";
import deleteIcon from "../../../public/icons/delete.svg";
import { useState } from "react";
import Modal from "../modal/Modal";
import { Link } from "react-router-dom";
import DeleteModal from "../deleteModal/DeleteModal";
import { useContext } from "react";
import { tasksContext } from "../../context/useTasksContext";

function TaskCard({ task }) {
  const [isUpdateOpen, setisUpdateOpen] = useState(false);
  const [isDeleteOpen, setisDeleteOpen] = useState(false);
  const { setSelectedTask } = useContext(tasksContext);

  return (
    <>
      {isUpdateOpen && <Modal closeFunction={setisUpdateOpen} task={task} />}
      {isDeleteOpen && (
        <DeleteModal closeFunction={setisDeleteOpen} taskID={task?.id} />
      )}

      <div className={styles.cardWrapper}>
        <h3
          style={{
            backgroundColor: task?.category == "work" ? "#f68181" : "#df81f6",
          }}
        >
          {task?.category}{" "}
        </h3>
        <h1>{task?.title}</h1>
        <p>{task?.description}</p>
        <span>{task?.date}</span>
        <div className={styles.actions}>
          <span
            className={styles.status}
            style={{ backgroundColor: task?.complated ? "#4caf50" : "#f9d342" }}
          >
            {task?.complated ? "Completed" : "pending"}
          </span>
          <div>
            <Link to={`task/${task?.id}`}>
              <img
                src={viewIcon}
                alt="add task icon Description   image  "
                loading="lazy"
                width={23}
              />
            </Link>
            <img
              src={updateIcon}
              alt="add task icon Description   image  "
              loading="lazy"
              onClick={() => setisUpdateOpen((value) => !value)}
              width={23}
            />
            <img
              src={deleteIcon}
              alt="add task icon Description   image  "
              loading="lazy"
              width={23}
              onClick={() => setisDeleteOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
