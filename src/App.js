import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare, faX, faPlus } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import Modal from './components/modal/Modal';

function App() {
  const [toDos, setToDo] = useState([
    {"id": 1, "title": "Task 1", "status": false},
    {"id": 2, "title": "Task 2", "status": true},
  ]);

  const [openModal, setOpenModal] = useState(false);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  const addTask = () => {

  };

  const deleteTask = (id) => {

  };

  const toggleMark = (id) => {
    
  };

  const cancelUpdate = () => {

  };

  const updateTask = () => {

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
                <span className='checkIcon' title='Finish Task'><FontAwesomeIcon icon={faCheck} /></span>
                <span className='editIcon' title='Edit Task'><FontAwesomeIcon icon={faPenToSquare} /></span>
                <span className='deleteIcon' title='Delete Task'><FontAwesomeIcon icon={faX} /></span>
              </div>
            </div>

          </React.Fragment>
        );
      })}

    <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
}

export default App;
