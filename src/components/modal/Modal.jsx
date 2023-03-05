import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

import './Modal.css'

function Modal({open, onClose, taskName, setTaskName, description, setDescription, dueDate, setDueDate, addTask}) {
  if (!open) return null;

  const onSubmitClicked = () => {
    addTask()
    onClose()
  }

  return (
    <div className='overlay'>
        <div className="modalContainer">
          <div className="modalRight">
            <button className='btn closeBtn btn-danger' onClick={onClose}><FontAwesomeIcon icon={faX} /></button>

            <div className="content">
              <h1>Add New Task</h1>
              <label htmlFor="taskName"> Task Name </label>
              <input type="text" className='taskName' 
              placeholder='Enter task name...' value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} />

              <label htmlFor="description"> Description </label>
              <textarea className='description' rows='5' 
              value={description} onChange={(e) => setDescription(e.target.value)}/>

              <label htmlFor='datePicker'> Due Date</label>
              <input type="date" className='datePicker'
              value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
            </div>

            <div className="btnContainer">
                <button className='btn btn-success' onClick={onSubmitClicked}><span>Submit</span></button>
                <button className='btn btn-danger' onClick={onClose}><span>Cancel</span></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal