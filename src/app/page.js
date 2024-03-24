"use client"
import "../../public/styles.css"

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { MdDeleteForever } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";



export default function Home(){
  const taskRef = useRef();
  const taskIdRef = useRef();
  const taskIDTodeleteRef = useRef();
  const taskIDToUpdateRef = useRef();
  const taskNameToUpdateRef = useRef();

  const [inputTask,setInputTask] = useState("");

  const [tasks, setTasks] = useState([]);
  const [updated,setUpdated] = useState(false);
  const [updatedError, setUpdatedError] = useState(false);
  const [created, setCreated] = useState(false);
  const [deleted,setDeleted] = useState(false);
  const [deletedError, setDeletedError] = useState(false);
  

  async function addProduct() {
    const task = taskRef.current.value.trim();
    // const taskId = taskIdRef.current.value.trim();
    // console.log(task);
    // console.log(taskId);
    const postData = {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        // taskId: taskId,
      }),
    }

    if(task.length < 3) return;

    const res = await fetch(`http://localhost:3000/api/tasks1`, postData);

    const response = await res.json();


    console.log("Response from addProduct Route::",response);

    // if(response.response.message !== "success") return;
    // console.log(response);

    setCreated(true);
    const newTask = response.task;

    setTasks([
      ...tasks,
      {
        task_id:newTask.task_id,
        task:newTask.task,
      }
    ]);

    setInputTask("");

  }

  async function getProducts() {
    const postData = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(`http://localhost:3000/api/tasks1`, postData);

    const response = await res.json();
    // console.log(response);
    // console.log("data");
    setTasks(response.tasks);
    // console.log("Task::",tasks);
  }

  async function deleteProduct(id) {
      console.log(id);
    const postData = {
      method:"DELETE",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        task_id: id
      })
    }
    console.log(tasks);
    const res = fetch("http://localhost:3000/api/tasks1", postData);

    const filteredTasks = tasks.filter(task => task.task_id !== id);
    
    console.log(filteredTasks);
    setTasks(filteredTasks);

  }

  async function updateProduct() {

  }

  useEffect(() => {
    getProducts();
  }, []);

  return(
    <>
    <div className="container">
      <div>
        {tasks.map((task,index) => {
          return(
            <div key={task.task_id} className="tasks-container">
              {/* <span>task_id</span>:{task.task_id}<br/>{" "} */}
              {/* <span>product_name</span>:{task.task}{" "} */}
              <div className="task-container">
                <p>{task.task}</p>
                <div className="operations">
                  <Link className="operation-btn" href={`${task.task_id}`}><RxUpdate /></Link>
                  <MdDeleteForever className="operation-btn" type="button" onClick={ () =>{deleteProduct(task.task_id)}}/>
                </div>
              </div>
              
              
            </div>
          )
        })}
      </div>

      <div className="addTask">
        <input className="input-field" type="text" ref={taskRef} name="inputTaskName" onChange={e => setInputTask(e.target.value)} value={inputTask}/>
        <input type="button" value="Add New Task" className="add-btn" onClick={addProduct}/>
      </div>
    </div>
      
    </>
    
  )
}