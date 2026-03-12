/* eslint-disable react-hooks/set-state-in-effect */


import { useEffect, useState } from "react";
import { api } from "../utils/api";

const CreateWorkout = ({ edit, saveWorkout }) => {
  const [workout, setWorkout] = useState({ title: "", reps: 0, weight: 0 });
  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let errors = {};
    if (!workout.title) errors.title = "Title is required";
    if (!workout.reps) errors.reps = "Reps is required";
    if (!workout.weight) errors.weight = "Weight is required";
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async () => {
    try {
      if (!validate()) return;

      if ( edit && edit._id) {
        const responce = await api.put(
          `/workouts/${edit._id}`,
          {
            title: workout.title,
            reps: workout.reps,
            weight: workout.weight,
          }
        );
        if (responce.data) {
          saveWorkout(responce.data);
          setWorkout({ title: "", reps: 0, weight: 0 });
        }
        return;
      }
      const responce = await api.post("/workouts", {
        title: workout.title,
        reps: workout.reps,
        weight: workout.weight,
      });
      if (responce.data) {
        saveWorkout(responce.data);
        setWorkout({ title: "", reps: 0, weight: 0 });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (edit) {
      setWorkout({ title: edit.title, reps: edit.reps, weight: edit.weight });
    }
    else {
      setWorkout({ title: "", reps: 0, weight: 0 });
    }
  }, [edit]);
  return (
    <div>
      <h1>Create Workout</h1>

      <div className="flex flex-col gap-5">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={workout.title || ""}
          placeholder={`${error.title ? error.title : "Title"}`}
          className={`${error.title ? "text-red-600 border-red-600" : "border-gray-600"} border-2 rounded-md`}
        />
        <input
          type="number"
          name="reps"
          onChange={handleChange}
          value={workout.reps || 0}
          placeholder={error.reps ? error.reps : "Reps"}
          className={`${error.reps ? "text-red-600 border-red-600" : "border-gray-600"} border-2 rounded-md`}
        />
        <input
          type="number"
          name="weight"
          onChange={handleChange}
          value={workout.weight || 0}
          placeholder={error.weight ? error.weight : "Weight"}
          className={`${error.weight ? "text-red-600 border-red-600" : "border-gray-600"} border-2 rounded-md`}
        />
      </div>
      <div className="flex justify-center mt-2">
        <button
          onClick={() => handleSubmit()}
          className="bg-blue-600 w-full rounded-sm shadow-md"
        >
      
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateWorkout;
