import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
export default function Modals(props) {
  return (
    <>
      <Modal id='success-Payment' tabIndex='-1' isOpen={props.modal_successMessage} centered>
        <ModalBody className='text-center p-5'>
          <div className='mt-2'>
            <lord-icon
              src='https://cdn.lordicon.com/hjeefwhm.json'
              trigger='hover'
              style={{ width: '150px', height: '150px' }}
            ></lord-icon>
            <h4 className='mb-3 mt-4'>Success</h4>
            
            {props?.num === 'id' ? (<><div className='hstack gap-2 justify-content-center'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  window.close();
                }}
              >
                Okay
              </button>
            </div></>) : (<><div className='hstack gap-2 justify-content-center'>
              <button
                className='btn btn-primary'
                onClick={() => {
                  props.tog_successMessage();
                }}
              >
                Stay
              </button>
              <Link to={'/list/' + props.table} className='btn btn-soft-success'>
                Go to Table
              </Link>
            </div></>)}
          </div>
        </ModalBody>
      </Modal>
      <Modal
        id='error'
        tabIndex='-1'
        isOpen={props.modal_errorMessage}
        toggle={() => {
          props.tog_errorMessage();
        }}
        centered
      >
        <ModalBody className='text-center p-5'>
          <div className='text-end'>
            <button
              type='button'
              onClick={() => {
                props.tog_errorMessage();
              }}
              className='btn-close text-end'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='mt-2'>
            <lord-icon
              src='https://cdn.lordicon.com/vfzqittk.json'
              trigger='hover'
              style={{ width: '150px', height: '150px' }}
            ></lord-icon>
            <h4 className='mb-3 mt-4'>Error</h4>
            <p className='text-muted fs-15 mb-4'>
              An error has occured, please check if the fields are filled correctly, or if the card already exists.
            </p>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        id='error'
        tabIndex='-1'
        isOpen={props.modal_errorMessage2}
        toggle={() => {
          props.tog_errorMessage2();
        }}
        centered
      >
        <ModalBody className='text-center p-5'>
          <div className='text-end'>
            <button
              type='button'
              onClick={() => {
                props.tog_errorMessage2();
              }}
              className='btn-close text-end'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div className='mt-2'>
            <lord-icon
              src='https://cdn.lordicon.com/vfzqittk.json'
              trigger='hover'
              style={{ width: '150px', height: '150px' }}
            ></lord-icon>
            <h4 className='mb-3 mt-4'>Error</h4>
            <p className='text-muted fs-15 mb-4'>
              Account not found, please check if the fields are filled correctly.
            </p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
