import { useEffect } from "react";
import { useState } from "react";
import WorkoutCard from "../componants/WorkoutCard";
import CreateWorkout from "../componants/CreateWorkout";
import { api } from "../utils/api";

const WorkoutPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [edit, setEdit] = useState({});


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const responce = await api.get("/workouts");
        if (responce.data) {
          setWorkouts(responce.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchWorkouts();
  }, []);
  const deleteWorkout = async (id) => {
    try {
      const responce = await api.delete(
        `/workouts/${id}`
      );
      if (responce.data) {
        setWorkouts((prev) => prev.filter((work) => work._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  const updateWorkout = (id) => {
    const edit = workouts.find((work) => work._id === id);
    setEdit(edit);

  };

  const saveWorkout = (data) => {
  if (edit && edit._id) {

    setWorkouts((prev) =>
      prev.map((w) => (w._id === data._id ? data : w))
    );
    setEdit(null);
  } else {

    setWorkouts((prev) => [data, ...prev]);
    setEdit(null);
  }
};
  return (
    <div className="container flex">
      <div className="w-2/3">
        {workouts &&
          workouts.map((workout) => {
            return (
              <div key={workout._id}>
                <WorkoutCard
                  workout={workout}
                  deleteWorkout={deleteWorkout}
                  updateWorkout={updateWorkout}
                />
              </div>
            );
          })}
      </div>
      <div>
        <CreateWorkout edit={edit} saveWorkout={saveWorkout} />
      </div>
    </div>
  );
};

export default WorkoutPage;
