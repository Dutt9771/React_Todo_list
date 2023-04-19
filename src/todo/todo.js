import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";


import Button from "@mui/material/Button";
import React, { useEffect,useState } from "react";


export default function Todo() {
  const [todos , setTodos] = useState(localStorage.getItem('todos')  || []);
  const [newTodo , setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const handleNewTodo = (e) => {
    setNewTodo(e.target.value);
  }
  const handleAddTodo = (e) => {
    if (newTodo !== '') {
        setTodos([...todos, newTodo]);
        setNewTodo('');
        document.getElementById("err").innerHTML=""

      }else {
        document.getElementById("err").innerHTML="please Enter To DO"
      }
  }



  const handleDeleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };


  return (


      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "40ch" },
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
        noValidate
        autoComplete="off"
      >
        {/* <div>
       <label htmlFor="name">Name</label>
       <input type="text" id='name' name='name' placeholder='Enter name'/>
      </div> */}
        <div>
        <FormControl>
                        <TextField
                          placeholder="Type something here…"
                          minRows={3}
                          onChange={handleNewTodo}
                          sx={{
                            minWidth: 300,
                          }}
                          value={newTodo}
                        />
                        <Button variant="contained" color="primary" sx={{ m: 2 }} onClick={handleAddTodo}>Add To Do</Button>
                  </FormControl>
                  <div id="err" style={{color:'red'}}>"Please Enter todo"</div>
        </div>
        {/* <div style={{ color: "red" }}>
          {errors.name && touched.name ? errors.name : null}
        </div> */}

        <div>
          <Button
            variant="outlined"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            ADD
          </Button>
        </div>
    
        <Box sx={{ width : '100%' , bgcolor : 'background.paper' }}>
              <List
                  sx={{ width: '100%' , bgcolor: 'background.paper' }}
              >
                  {todos.map((todo, index) => (
                    <ListItem key={index} sx = {{ bgcolor : "#f5f5f5" }}>
                      <ListItemText  primary={todo} >
                           {todo}
                      </ListItemText>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(index)}>
                          Delete
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
               <Typography align="right" color="inherit" component="div" sx = {{margin : 2}}>
                    {todos.length} To Do
                </Typography>
            </Box>      
      </Box>      

  );
}
