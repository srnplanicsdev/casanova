const Workout = require("../model/workoutModel");

const getWorkouts = async(req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1});
    res.status(200).json(workouts);

    if(!workouts) {
        return res.status(404).json({error: "No workouts found"});
    }
}

const getWorkout = async( req, res)=>{
    const { id }= req.params
     if(!id){
         return res.status(404).json({error: "No id found"});
     }
     const workout = await Workout.find({_id: id});
     if(!workout){
         return res.status(404).json({error: "No workout found"});
     }
     res.status(200).json(workout);
    
}

const createWorkout = async( req, res )=>{
    try{
        const { title, reps, weight } = req.body;
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, weight, user_id});
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message });
    }
}
const deleteWorkout = async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(404).json({error: "No id found"});
    }
    const workout = await Workout.findOneAndDelete({_id: id});
    if(!workout){
        return res.status(404).json({error: "No workout found"});
    }
    res.status(200).json(workout);
    
}
const updateWorkout = async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(404).json({error: "No id found"});
    }
    const user_id = req.user._id
    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body, user_id});
    if(!workout){
        return res.status(404).json({error: "No workout found"});
    }
    res.status(200).json(workout);
}
module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}