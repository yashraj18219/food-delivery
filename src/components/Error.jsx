import React from "react";
import { useRouteError } from "react-router-dom";

const Error = ()=>{
    const e = useRouteError();
return (
    <div><h2>Oopps!!</h2>
    <h4>{e.status}: {e.statusText}</h4>
    </div>
    
)
}
export default Error