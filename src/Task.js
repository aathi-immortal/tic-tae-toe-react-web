import { useEffect } from "react";

export function Task(value)
{
    useEffect(()=>
    {
        console.log("component mounted");
        return ()=>
        {
            console.log("component unmounted"); 

        }
    },[]);
    return(
        <div>
            <h1 style={{display:"inline"}}>{value.name}</h1>
                <button onClick={()=>value.complete(value.id)}>complete</button>
                <button onClick={()=>value.deleteTheTask(value.id)}>X</button>
        </div>
    );

        
    
    
}