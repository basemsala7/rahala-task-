import Title from "../../components/title/Title";
import styles from "./addTask.module.css";
import useDataGetter from "./data";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function AddTask() {
  const { handleChangeFunction, submitTask, isLoading, task } = useDataGetter();
  return (
    <div className={styles.container}>
      <ToastContainer />

      <Title>Add Task</Title>
      <form className={styles.form}>
        <div>
          <label htmlFor="title">Task title : </label>
          <input
            type="text"
            placeholder="task title"
            name="title"
            id="title"
            onChange={handleChangeFunction}
            value={task?.title}
          />
        </div>

        <div>
          <label htmlFor="description">Task Description :</label>
          <textarea
            name="description"
            id="description"
            onChange={handleChangeFunction}
            value={task?.description}
          ></textarea>
        </div>

        <div className={styles.dateContainer}>
          <div>
            <label htmlFor="category">Task Type : </label>
            <select
              name="category"
              id="category "
              onChange={handleChangeFunction}
              value={task?.category}
            >
              <option value=""> </option>
              <option value="work"> Work</option>
              <option value="personal">Personal</option>
            </select>
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              onChange={handleChangeFunction}
              value={task?.date}
            />
          </div>
        </div>
        <button
          type="submit"
          onClick={submitTask}
          disabled={isLoading}
          style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
        >
          {" "}
          Add Task {isLoading && <span className={styles.loader}></span>}
        </button>
      </form>
    </div>
  );
}

export default AddTask;
