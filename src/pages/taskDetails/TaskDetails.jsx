import { useParams } from "react-router-dom";
import styles from "./taskDetails.module.css";
import Title from "../../components/title/Title";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import notFound from "../../../public/1-10.webp";
import Loading from "../../layout/loading/Loading";
function TaskDetails() {
  const [task, setTask] = useState({});
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  const { taskId } = useParams();

  useEffect(() => {
    const getTaskFunction = async () => {
      try {
        setIsloading(true);
        const response = await axios.get(`/tasks/${taskId}`, {});
        //console.log(response.data);
        setTask(response?.data);
      } catch (error) {
        if (error.response?.status == 404) {
          setError("Task not found");
        } else {
          setError("Error occurred while fetching task");
        }
      } finally {
        setIsloading(false);
      }
    };
    getTaskFunction();
  }, [taskId]);
  return (
    <div>
      <Title>Task Details</Title>
      {isLoading && <Loading />}
      {error && (
        <img src={notFound} className={styles.notFound} alt="not found image" />
      )}
      {!error && task?.title && (
        <div className={styles.Wrapper}>
          <div>
            <h2>{task?.title}</h2>
            <span
              style={{
                backgroundColor: task?.complated ? "#4caf50" : "#f9d342",
              }}
            >
              {task?.complated ? "Completed" : "pending"}
            </span>
          </div>
          <h2>About Task </h2>
          <p className={styles.description}>{task?.description}</p>
          <p>
            <b>Due Date : </b>
            {task?.date}
          </p>
          <p>
            <b>Task Type : </b> {task?.category}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskDetails;
