import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React, {useEffect,useState } from "react";


export default function Todo() {
  const [newTodo , setNewTodo] = useState("");
  const [open,setOpen] = useState(true);
  let [todos , setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || []);
  
  // if(localStorage.getItem('todos')){
  //   todos=JSON.parse(localStorage.getItem('todos'));
  //   console.log("todos",todos);
  // // }
  useEffect(() => {
    if(!localStorage.getItem('todos')){
      localStorage.setItem('todos', JSON.stringify([]));
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  const handleNewTodo = (e) => {
    setNewTodo(e.target.value);
  }

  const handleAddTodo = () => {
    if (newTodo !== '') {
      setTodos([...todos, newTodo]);
      // localStorage.setItem('todos', JSON.stringify(todos));    
      setNewTodo('');
    }else {
      setOpen(false);
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

        <div>
        <FormControl>
                        <TextField
                          placeholder="Type something here…"
                          minRows={3}
                          onChange={handleNewTodo}
                          sx={{
                            minWidth: 200,
                          }}
                          value={newTodo}
                        />
                        <Button variant="contained" sx={{ m: 2,backgroundColor:'blue',color:'white'}} onClick={handleAddTodo}>Add To Do</Button>
                  </FormControl>
                  <div id="err" style={{color:'red'}}>{!open?"Please Enter todo":null}</div>
        </div>
    
        <Box sx={{ width : '100%' , bgcolor : 'background.paper' }}>
<Stack
  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}


>
                  {todos.map((todo, index) => (


<Stack
  direction="column"
  justifyContent="center"
  alignItems="center"
  spacing={2}
  style={{
    display: "container",
    padding: "25px",
    borderRadius: "5px",
    margin: "10px",
    marginRight: "10px",
    justifyContent: "center",
    width: "80%",
  }}
  sx={{
    color: "black",
    border: "1px solid black",
  }}
  key={index}
>
  <div style={{display:'flex'}}   >
<p sx={{margin:'auto'}}>{todo}</p>
<Button
        variant="outlined"
        type="button"
        sx={{
      display: "flex",
      justifyContent: "end",
      margin:'auto',
          marginTop: "5px",
          marginBottom: "5px",
          marginLeft: "18px",
          color: "black",
          border: "1px solid black",
          "&:hover": {
            color: "white",
            backgroundColor: "blue",
            border: "1px solid blue",
          },
        }}
       edge="end" aria-label="delete" onClick={() => handleDeleteTodo(index)}>
                          Delete
                         </Button>
  </div>

</Stack>
))}
</Stack>
               <Typography align="right" color="inherit" component="div" sx = {{margin : 2}}>
                    {todos.length} To Do
                </Typography>
            </Box>      
      </Box>      

  );
}
