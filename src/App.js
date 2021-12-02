import logo from './logo.svg';
import './App.css';
import React, {useEffect,useState} from 'react'
import { db, auth } from "../src/firebase";

export default  function App() {
  const [task, settask] = useState("");
  const [arrTask, setarrtask] = React.useState({});
  useEffect(() => {
    getTask();
  }, [])

  function addTask() {
    if (task === '') {
      alert('Ingrese una tarea')
    } else {
      db.ref('task').child(task).set({ name: task,status:false }).then((res) => {
        console.log(res)
        settask('');
        getTask();
      }).catch(err => {
        console.log(err)
      })
  
    }
  }
  const getTask = () => {
    db.ref('task').get().then((res) => {
      console.log(res);
      let objItem = res.val();
      console.log(objItem);
      if (objItem === null) {
        setarrtask({});
      } else {
        setarrtask(objItem);
      }
    }).catch((err) => {
      console.log(err);

    });
  }

  return (
  <div className="container">
  <div className="task-list">
    {(arrTask==null)?'No hay tareas': null}
    {Object.values(arrTask).map((e, index) =>

      <label className="text_" key={index}>{e.name}</label>
    )}
    </div>
  <div className="input-list">
    <input type="text" name="agregarTarea"  value={task} onChange={(e)=>{settask(e.target.value)}}/>
    <button type="button" name="botonAgregar" onClick={addTask}>Agregar Tarea</button>

  </div>
  </div>
  );
}


