import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutCard = ({ workout, deleteWorkout, updateWorkout }) => {
  return (
    <div>
      <div className="flex justify-between my-2 border-gray-600 border-2 rounded-xl p-2 mx-20">
        <div className="  flex flex-col ">
          <p className="bold">Title: {workout.title}</p>
          <p className="bold">Reps: {workout.reps}</p>
          <p className="bold">Weight: {workout.weight}</p>
          <p className="mt-2 text-gray-600">
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        <div className="flex gap-5">
          <button onClick={() => deleteWorkout(workout._id)}>Delete</button>
          <button onClick={() => updateWorkout(workout._id)}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
