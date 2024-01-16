const Task = require('../models/Task')


const getalltasks =  async (req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(201).json({tasks})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
    // res.send('all fucking tasks')
}

const createtask= async (req,res)=>
    {
    // const task = await Task.create({name:'first task'}) we can hard code and enter data manually but it makes more sense to add the data from req,body that we are going to get
    try{
    const task = await Task.create(req.body)
    res.status(201).json({task}) //201 -- successfull post request
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const gettask= async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).json({msg:`NO task with id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const updatetask= async (req,res)=>{
    try {
        const {id:taskId} = req.params;
        // const task = await Task.findOneAndUpdate({_id:taskId},req.body)
        const task = await Task.findOneAndUpdate({_id:taskId},req.body,{
            new:true, //always return the new item
            runValidators:true
        })
       //when we don't use options we get the old value in response from patch  but the value is updated
       //
        // res.status(200).json({id:taskId,data:req.body})
        if(!task){
            return res.status(404).json({msg:`NO task with id : ${taskID}`})
        }
        res.status(200).json({task})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

const deletetask= async (req,res)=>{
    try {
        const {id:TaskID} = req.params
        const task = await Task.findOneAndDelete({_id:TaskID})
        if(!task){
            return res.status(404).json({msg:`NO task with id : ${taskID}`})
        }
        res.status(200).json({msg:`${task.name} successfully deleted`})
    } catch (error) {
        res.status(500).json({msg:error})
    }
}

module.exports = {getalltasks,createtask,gettask,updatetask,deletetask}
