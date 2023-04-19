import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from 'formik';
import React, { useEffect,useRef } from "react";
// import {Registrationschema} from '../schemas';

const initialvalues ={
  name:'',
}

export default function Todo(){
    let Todo_items
    let Todo_items_ref=useRef([])
    useEffect(() => {
        if(!localStorage.getItem('TodoList')){
        localStorage.setItem("TodoList",JSON.stringify([]));
        }else{
            Todo_items_ref.current = JSON.parse(localStorage.getItem('TodoList'));
            console.log("🚀 ~ file: todolist.js:35 ~ Todolist ~ ̥:", Todo_items_ref.current)
            document.getElementById('todo_items').innerHTML= Todo_items_ref.current;
            // Todo_items=Todo_items_ref.current;
        }
      });

  const {values,errors,touched,handleBlur,handleChange,handleSubmit}=useFormik({
    initialValues:initialvalues,
   
    onSubmit:(values,action)=>{
        if(!localStorage.getItem('TodoList')){
            
            let Arr=JSON.parse(localStorage.getItem('TodoList'))
            console.log("🚀 ~ file: todolist.js:11 ~ Todolist ~ ̥:",values);
            Arr.push(values.name)
            localStorage.setItem("TodoList",JSON.stringify(Arr));
        }else{
            let Arr=[]
            Arr=JSON.parse(localStorage.getItem('TodoList'))
            console.log("🚀 ~ file: todolist.js:25 ~ Todolist ~ ̥:",values);
            Arr.push(values.name)
            localStorage.setItem("TodoList",JSON.stringify(Arr));
            // Get_todo()
        }
    }
  })

  
  const Get_todo=()=>{
    if(localStorage.getItem('TodoList')){

        Todo_items= JSON.parse(localStorage.getItem('TodoList'))
        console.log("🚀 ~ file: todolist.js:35 ~ Todolist ~ ̥:",Todo_items)
        document.getElementById('todo_items').innerHTML=Todo_items
    }
  }
//   Get_todo()
// const todo=(items)=>{
//     return items.map((item)=>{ <li>{item.name}</li>
//     })
// }
  console.log("values",values)
    return (
      <form action="post" onSubmit={handleSubmit} noValidate
      autoComplete="off" >
        {/* component="form" */}
        <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' },
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',

      }}
      
      noValidate
      autoComplete="off"
    >

      {/* <div>
       <label htmlFor="name">Name</label>
       <input type="text" id='name' name='name' placeholder='Enter name'/>
      </div> */}
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Enter Todo"
          name='name'
          type='text'
          multiline
          maxRows={4}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete='off'
        />
      </div>
      <div style={{color:'red'}}>
      {errors.name && touched.name ? errors.name : null}
      </div>
      
      <div>
      <Button variant="outlined" type='submit' style={{marginTop:'10px'}}>ADD</Button>

      </div>
    </Box>
    <div>
    <p onLoad={Get_todo} id='todo_items'></p>
    <p>{Todo_items_ref.current.map((name)=>{return <li>{name}</li>})}</p>
    </div>
       </form>
    
    )
}