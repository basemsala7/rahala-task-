import styles from "./allTasks.module.css";
import TaskCard from "../../components/taskCard/TaskCard";
import Title from "../../components/title/Title";
import { useContext, useEffect, useState } from "react";
import { tasksContext } from "../../context/useTasksContext";
import Loading from "../../layout/loading/Loading";
import NotFound from "../not-found/NotFound";

function AllTasks() {
  const { dateSort, filterFunction, displayedTasks, isLoading, error } =
    useContext(tasksContext);

  const [categoryState, setCategoruState] = useState("all");
  const [complateState, setcomplateState] = useState("all");
  const [dateState, setDateState] = useState("");

  const handleAllChange = (e) => {
    const { name, value } = e.target;
    if (name == "complated") {
      if (value == "all") {
        setcomplateState(value);
        return;
      }
      const complateStatus = value == "complated" ? true : false;
      setcomplateState(complateStatus);
    } else {
      setCategoruState(value);
    }
  };

  const handleSortChange = (e) => {
    setDateState(e.target.value);
  };

  useEffect(() => {
    filterFunction(categoryState, complateState);
  }, [categoryState, complateState]);

  useEffect(() => {
    dateSort(dateState);
  }, [dateState]);

  return (
    <>
      <Title>All Tasks </Title>

      <div className={styles.filterWrapper}>
        <div className={styles.selectWrapper}>
          <label htmlFor="category">category </label>
          <select name="category" id="category" onChange={handleAllChange}>
            <option value={"all"}>All</option>
            <option value={"personal"}>Personal</option>
            <option value={"work"}>Work</option>
          </select>
        </div>
        <div className={styles.selectWrapper}>
          <label htmlFor="sort">Date </label>
          <select name="sort" id="sort" onChange={handleSortChange}>
            <option value={""}> </option>
            <option value={"newest"}>Newest</option>
            <option value={"lastes"}>lastes</option>
          </select>
        </div>
        <div className={styles.radioWrapper}>
          <input
            type="radio"
            name="complated"
            value="all"
            id="all"
            onChange={handleAllChange}
          />
          <label htmlFor="all">all</label>
          <input
            type="radio"
            name="complated"
            value="complated"
            id="complated"
            onChange={handleAllChange}
          />
          <label htmlFor="complated">Complated</label>
          <input
            type="radio"
            name="complated"
            value="pending"
            id="pending"
            onChange={handleAllChange}
          />
          <label htmlFor="pending">pending</label>
        </div>
      </div>
      {isLoading && <Loading />}
      {error && <NotFound />}

      {!isLoading && !error && (
        <div className={styles.taskList}>
          {displayedTasks?.length < 1 ? (
            <p className={styles.empty}>no Tasks to show </p>
          ) : (
            displayedTasks?.map((task) => (
              <TaskCard task={task} key={task.id} />
            ))
          )}
        </div>
      )}
    </>
  );
}

export default AllTasks;
