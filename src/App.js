import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faX, faPlus } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Modal from './components/modal/Modal';

function App() {
  const [toDos, setToDos] = useState([
    {"id": 1, "title": "Task 1", "status": false},
    {"id": 2, "title": "Task 2", "status": true},
  ]);

  const [openModal, setOpenModal] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('2023-03-04');
  const [description, setDescription] = useState('');

  const addTask = () => {
    if (!taskName || !dueDate) return

    console.log('here')
    let entryId = toDos.length + 1
    let entry = {"id": entryId, "title": taskName, "description": description, "dueDate": dueDate, "status": false}
    setToDos([...toDos, entry])
    setTaskName('')
    setDescription('')
    setDueDate('2023-03-04')
  };

  const deleteTask = (id) => {
    let tasks = toDos.filter( task => task.id !== id)
    setToDos(tasks)
  };

  const toggleMark = (id) => {
    let uTask = toDos.map( task => {
      if (task.id === id) {
        return ({...task, status: !task.status})
      }
      return task
    })
    setToDos(uTask)
  };

  const cancelUpdate = () => {

  };

  const updateTask = (id) => {

  };

  const changeTask = (e) => {

  };

  return (
    <div className="App">
      <br /><br />
      <h2>SimplyDo</h2>
      <br /><br />

      {/** Add new task */}
      <button className='btn btn-lg btn-success' onClick={() => setOpenModal(true)}><FontAwesomeIcon icon={faPlus} /> Add New Task </button>
      <br /><br />

      {/* Display Todos */}
      {toDos && toDos.length ? '' : 'You\'re all done!'}

      {toDos && toDos
      // TODO: SORT BY TIMESTAMP
      .map( (task, index) => {
        return (
          <React.Fragment key={task.id}>

            <div className='taskBg'>
              <div className={task.status ? 'done' : ''}>
                <span className='taskIndex'>{index+1}</span>
                <span className='taskTitle'>{task.title}</span>
              </div>

              <div className='iconsWrap'>
                <span className='checkIcon' title='Finish Task' onClick={() => toggleMark(task.id)}>
                  <FontAwesomeIcon icon={faCheck} /></span>
                <span className='editIcon' title='Edit Task' onClick={() => updateTask(task.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} /></span>
                <span className='deleteIcon' title='Delete Task' onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faX} /></span>
              </div>
            </div>

          </React.Fragment>
        );
      })}

    <Modal open={openModal} onClose={() => setOpenModal(false)}
    taskName={taskName} setTaskName={setTaskName} 
    description={description} setDescription={setDescription} 
    dueDate={dueDate} setDueDate={setDueDate} addTask={addTask} />
    </div>
  );
}

export default App;
