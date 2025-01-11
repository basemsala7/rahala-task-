import styles from "./modal.module.css";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { tasksContext } from "../../context/useTasksContext";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../../assets/js/tosterConfig";
import "react-toastify/dist/ReactToastify.css";

function Modal({ closeFunction, task }) {
  const [isChanged, setIschange] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { setSelectedTask, selectedTask, allTasks, setAllTasks } =
    useContext(tasksContext);

  useEffect(() => {
    setSelectedTask(task);
    return () => {
      setSelectedTask({});
    };
  }, []);

  const handleChange = (e) => {
    if (!isChanged) setIschange(true);

    const { name, type, value, checked } = e.target;

    setSelectedTask((pre) => ({
      ...pre,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e, id, data) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.patch(`/tasks/${id}`, data);
      const updatedTask = response?.data;

      const updatedTasks = allTasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      setAllTasks(updatedTasks);

      toast.dismiss();
      toast.success("Task updated successful ", toastConfig);
    } catch (error) {
      toast.dismiss();
      toast.warn("Tsome thing Wrong try again ", toastConfig);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <>
      <ToastContainer />
      {<div className={styles.overlay}></div>}

      <div className={styles.content}>
        <p
          className={styles.close}
          onClick={() => closeFunction((value) => !value)}
        >
          &times;
        </p>
        <form className={styles.form}>
          <div>
            <label htmlFor="title">Task title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={selectedTask?.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="description">Task Descriiption</label>
            <textarea
              name="description"
              id="description"
              value={selectedTask?.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <div>
              <label htmlFor="category">Type : </label>
              <select
                name="category"
                id="category"
                value={selectedTask?.category}
                onChange={handleChange}
              >
                <option value=""> </option>
                <option value="personal">Personal </option>
                <option value="work">work </option>
              </select>
            </div>

            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={selectedTask?.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.checkboxWrapper}>
            <input
              type="checkbox"
              id="checkbox"
              name="complated"
              checked={selectedTask?.complated}
              onChange={handleChange}
            />
            <label htmlFor="complated">Complated ? </label>
          </div>

          <button
            onClick={(e) => handleSubmit(e, selectedTask?.id, selectedTask)}
            disabled={!isChanged || isLoading}
            style={{ cursor: isChanged ? "pointer" : "not-allowed" }}
          >
            Submit Changes{" "}
            {isLoading && <span className={styles.loader}></span>}
          </button>
        </form>
      </div>
    </>,
    document.getElementById("modal")
  );
}

export default Modal;
