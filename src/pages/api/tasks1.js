import {query} from "@/lib/db"

export default async function handler(req,res){
    let tasks;
    let message;
    if(req.method === "GET"){
        const tasks = await query({
            query:"SELECT * FROM tasks ORDER BY task_id",
            values:[]
        });
        res.status(200).json({tasks:tasks});
    }

    if(req.method === "POST"){
        const taskName = req.body.task;
        // const taskId = parseInt(req.body.taskId);

        console.log(taskName);
        // console.log(typeof taskId);
        const addTasks = await query({
            query:"INSERT INTO tasks (task) VALUES (?)",
            values: [taskName],
        });
        if(addTasks.insertId){
            message="success";
        }else{
            message="error";
        }

        let task = {
            task_id: addTasks.insertId,
            // task_Id: taskId,
            task: taskName,
        };
        res.status(200).json({message: message, task: task});

    }

    if(req.method === "PUT"){
        const taskId = req.body.task_id;
        const taskName = req.body.task;

        // console.log("Id to be updatd::",taskId);
        // console.log("Name to be updated::",taskName);
        const updateTasks = await query({
            query:"UPDATE tasks SET task = ? WHERE task_id = ?",
            values: [taskName,taskId],
        })
        if(updateTasks.affectedRows){
            message="success";
        }else{
            message="error";
        }

        const task = ({
            task_id: taskId,
            task: taskName,
        });
        console.log(message);
        // res.status(200).json({response:{message: message, task: task}});
        res.status(200).json({message: message, task: task});


    }

    if(req.method === "DELETE") {
        const taskId = req.body.task_id;

        const deleteTask = await query({
            query:"DELETE FROM tasks WHERE task_id = ?",
            values:[taskId],
        })

        if(deleteTask.affectedRows){
            message="success";
        }else{
            message="error";
        }
        res.status(200).json({message:message,taskId:taskId});
    }
      
}