import React, { useEffect, useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faSquareCheck, faPenToSquare, faX, faPlus } from '@fortawesome/free-solid-svg-icons'

import './App.css'
import Modal from './components/modal/Modal'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { listTasks } from './graphql/queries'
Amplify.configure(awsExports);

function App({signOut}) {
  const [toDos, setToDos] = useState([])
  const [user, setUser] = useState('')
  const ref = useRef()
  ref.current = user

  useEffect(() => {
    getUser()
    fetchTasks()
  }, [])

  const getUser = async() => {
    await Auth.currentAuthenticatedUser().then((curr) => {
      setUser(curr.attributes.sub)
    }).catch(error => {
      console.log(error)
    })
  }

  const fetchTasks = async() => {
    try {
      const toDosData = await API.graphql(graphqlOperation(listTasks))
      const toDosList = toDosData.data.listTasks.items.filter(task => task.owner === ref.current)
      setToDos(toDosList)
    } catch (error) {
      console.log(error)
    }
  }

  const [openModal, setOpenModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')

  const [selectedTask, setSelectedTask] = useState('')
  const [taskName, setTaskName] = useState('')
  const [dueDate, setDueDate] = useState('2023-03-04')
  const [description, setDescription] = useState('')

  /**
   * Clears the fields of the Modal
   */
  const clearFields = () => {
    setTaskName('')
    setDescription('')
    setDueDate('2023-03-04')
  }

  /**
   * Adds a new task to the ToDo list.
   * @returns null
   */
  const addTask = () => {
    if (!taskName || !dueDate) return null

    let entryId = toDos.length + 1
    let entry = {id: entryId, taskName: taskName, description: description, dueDate: dueDate, status: false}
    setToDos([...toDos, entry])
    clearFields()
  }

  /**
   * Deletes the task with matching ID.
   * @param {*} id Task identifier
   */
  const deleteTask = (id) => {
    let tasks = toDos.filter( task => task.id !== id)
    setToDos(tasks)
  }

  /**
   * Completes the task with matching ID.
   * @param {*} id Task identifier
   */
  const toggleMark = (id) => {
    let uTask = toDos.map( task => {
      if (task.id === id) {
        return ({...task, status: !task.status})
      }
      return task
    })
    setToDos(uTask)
  }

  /**
   * Creates a popup with the appropriate fields filled out for the specified task
   * @param {*} task The task with all elements
   */
  const updateTask = (task) => {
    setSelectedTask({id: task.id, status: task.status})
    setTaskName(task.taskName)
    setDescription(task.description)
    setDueDate(task.dueDate)
    setModalTitle('Edit Task')
    setOpenModal(true)
  }

  /**
   * Updates the task.
   */
  const changeTask = () => {
    let updatedTask = {id: selectedTask.id, taskName: taskName, description: description, dueDate: dueDate, status: selectedTask.status}
    let filterToDos = [...toDos].filter( task => task.id !== updatedTask.id )
    setToDos([...filterToDos, updatedTask])
    clearFields()
  }

  return (
    <div className="App">
      <button type='button' className='btn btn-primary signOut' onClick={signOut}>Sign Out</button>

      <br /><br />
      <h2 className='appTitle'>SimplyDo</h2>
      <br /><br />

      {/** Add new task */}
      <button className='btn btn-lg btn-success' onClick={() => {setOpenModal(true); setModalTitle('Add Task')}}><FontAwesomeIcon icon={faPlus} /> Add New Task </button>
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
                <span className='taskTitle'>{task.taskName}</span>
              </div>

              <div className='iconsWrap'>
                {task.status ? (
                  <span className='checkIcon' title='Finish Task' onClick={() => toggleMark(task.id)}>
                  <FontAwesomeIcon icon={faSquareCheck} /></span>
                ) : (
                  <span className='checkIcon' title='Finish Task' onClick={() => toggleMark(task.id)}>
                  <FontAwesomeIcon icon={faSquare} /></span>
                )}
                <span className='editIcon' title='Edit Task' onClick={() => {updateTask({id: task.id, taskName: task.taskName, description: task.description, dueDate: task.dueDate, status: task.status})}}>
                  <FontAwesomeIcon icon={faPenToSquare} /></span>
                <span className='deleteIcon' title='Delete Task' onClick={() => deleteTask(task.id)}>
                  <FontAwesomeIcon icon={faX} /></span>
              </div>
            </div>

          </React.Fragment>
        )
      })}

    <Modal modalTitle={modalTitle} open={openModal} onClose={() => setOpenModal(false)}
    taskName={taskName} setTaskName={setTaskName} 
    description={description} setDescription={setDescription} 
    dueDate={dueDate} setDueDate={setDueDate} addTask={addTask} clearFields={clearFields} updateTask={changeTask}/>
    </div>
  )
}

export default withAuthenticator(App)
