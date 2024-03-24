"use client"

import { useEffect, useRef,useState } from "react";
import Router from "next/router";


export default function updateTask({ params }) {
    const taskNameToUpdateRef = useRef();

    const [updated,setUpdated] = useState(false);
    
    // const router = useRouter();
    console.log(params);

    async function handleupdate() {
        const id = params.task;
        const taskName = taskNameToUpdateRef.current.value.trim();

        const postData = {
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                task_id: id,
                task: taskName,
            })
        }

        console.log("inside the [task] field");
        const res = fetch(`http://localhost:3000/api/tasks1`,postData);
        
        window.location = 'http://localhost:3000';


        // console.log("Response::",response.message);

        // if(response.message === "success"){
        //     setUpdated(true);
        //     Router.push('http://localhost:3000');
        // }else{
        //     console.error('Failed to update task');
        // }

        

        // const response = await res.json();

        // if(response.message !== "success") return;

        // setUpdated(true);

        // navigate("http://localhost:3000");

    }

    // useEffect(() => {
    //     const id = params;
    //     const taskName = taskNameToUpdateRef.current.value.trim();


    // },[])

    return (
        <div className="container">
            <div className="update-container">
                <input className="input-field" type="text"  ref={taskNameToUpdateRef} placeholder="set updated task"/>
                <input type="button" value="Update" onClick={handleupdate} className="add-btn"/>
            </div>
            
        </div>
    )
}