import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { toastConfig } from "../../assets/js/tosterConfig";
import { useContext } from "react";
import { tasksContext } from "../../context/useTasksContext";

const useDataGetter = () => {
  const { setAllTasks } = useContext(tasksContext);

  const initialValue = {
    title: "",
    description: "",
    date: "",
    complated: false,
    category: "",
  };

  const [task, setTask] = useState(initialValue);
  const [isLoading, setLoading] = useState(false);

  const handleChangeFunction = (e) => {
    const name = e.target.name;
    setTask({ ...task, [name]: e.target.value });
    //console.log(task);
  };

  const submitTask = async (e) => {
    e.preventDefault();
    const { title, description, date, category } = task;

    if (!title || !description || !date || !category) {
      toast.dismiss();
      toast.warn("all fields requird ", toastConfig);
    } else {
      try {
        setLoading(true);
        const response = await axios.post("/tasks", task);
        //console.log("Task Created:", response.data);
        setAllTasks((pre) => [...pre, response.data]);
        toast.dismiss();
        toast.success("Task added successful ", toastConfig);
      } catch (error) {
        console.error("Error creating task:", error);
        toast.dismiss();
        toast.error("some thing Wrong try again ", toastConfig);
      } finally {
        setLoading(false);
        setTask(initialValue);
      }
    }
  };
  return {
    handleChangeFunction,
    submitTask,
    isLoading,
    task,
  };
};

export default useDataGetter;
