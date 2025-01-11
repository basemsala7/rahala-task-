import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { toastConfig } from "../assets/js/tosterConfig";

const tasksContext = createContext();
const TaskProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [displayedTasks, setDisplayedTasks] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});

  const deleteTask = async (id, callback) => {
    try {
      setIsloading(true);
      const response = await axios.delete(`/tasks/${id}`);
      const filteredTask = allTasks.filter((task) => task?.id != id);
      setAllTasks(filteredTask);
      
      callback(false);
      //console.log("taskes after delete", allTasks);
    } catch (error) {
      // console.log(error);
      toast.dismiss();
      toast.error(" some thing wrong try again  ", toastConfig);
    } finally {
      setIsloading(false);
    }
  };

  const filterFunction = useCallback(
    (category, complated) => {
      switch (true) {
        case complated === "all" && category === "all":
          setDisplayedTasks(allTasks);
          break;
        case complated == "all" && category === "work":
          const filteredWork = allTasks.filter(
            (task) => task?.category == "work"
          );
          //console.log(filteredWork);
          setDisplayedTasks(filteredWork);
          break;
        case complated == "all" && category === "personal":
          const filteredPersonal = allTasks.filter(
            (task) => task?.category == "personal"
          );
          setDisplayedTasks(filteredPersonal);
          break;
        case complated && category === "personal":
          const filteredPersonalComp = allTasks.filter(
            (task) => task?.category == "personal" && task?.complated
          );
          setDisplayedTasks(filteredPersonalComp);
          break;
        case complated && category === "work":
          const filteredworkComp = allTasks.filter(
            (task) => task?.category == "work" && task?.complated
          );
          setDisplayedTasks(filteredworkComp);
          break;
        case !complated && category === "work":
          const filteredworkCompnot = allTasks.filter(
            (task) => task?.category == "work" && !task?.complated
          );
          setDisplayedTasks(filteredworkCompnot);
          break;
        case !complated && category === "personal":
          const filterepersonalCompnot = allTasks.filter(
            (task) => task?.category == "personal" && !task?.complated
          );
          setDisplayedTasks(filterepersonalCompnot);
          break;
        case !complated && category === "all":
          const filtercompnot = allTasks.filter((task) => !task?.complated);
          setDisplayedTasks(filtercompnot);
          break;
        case complated && category === "all":
          const filtercomp = allTasks.filter((task) => task?.complated);
          setDisplayedTasks(filtercomp);
          break;

        default:
        //console.log("No matching case found");
      }
    },
    [allTasks]
  );

  const dateSort = useCallback(
    (value) => {
      const sorted = [...displayedTasks].sort((a, b) =>
        value === "newest"
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date)
      );
      setDisplayedTasks(sorted);
    },
    [displayedTasks]
  );

  useEffect(() => {
    let subscription = true;
    const getAllTasksFunction = async () => {
      try {
        setIsloading(true);
        const response = await axios.get("/tasks");
        //console.log(response.data);
        if (subscription) {
          setAllTasks(response.data);
          setDisplayedTasks(response.data);
        }
      } catch (error) {
        if (subscription) {
          console.log(error);
          setError("Some thig Wrong Try again");
        }
      } finally {
        if (subscription) {
          setIsloading(false);
        }
      }
    };
    getAllTasksFunction();

    return () => {
      subscription = false;
    };
  }, []);

  useEffect(() => {
    setDisplayedTasks(allTasks);
  }, [allTasks]);

  return (
    <tasksContext.Provider
      value={{
        allTasks,
        setAllTasks,
        deleteTask,
        selectedTask,
        setSelectedTask,
        filterFunction,
        displayedTasks,
        dateSort,
        isLoading,
        error,
      }}
    >
      {children}
    </tasksContext.Provider>
  );
};

export { tasksContext, TaskProvider };
