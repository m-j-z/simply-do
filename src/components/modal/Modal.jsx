import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'

import './Modal.css'

const Modal = ({open, onClose}) => {
    if (!open) return null;
  return (
    <div className='overlay'>
        <div className="modalContainer">
          <div className="modalRight">
            <button className='btn closeBtn btn-danger' onClick={onClose}><FontAwesomeIcon icon={faX} /></button>

            <div className="btnContainer">
                <button className='btn btn-success'><span>Submit</span></button>
                <button className='btn btn-danger' onClick={onClose}><span>Cancel</span></button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal