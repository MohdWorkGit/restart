import React from 'react'
import { Modal} from "react-bootstrap";
import EditScriptsInfo from './EditScriptInfo';

export default function EditScriptPopup(props) {  
    return (
    <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className='toptop'
            >
                <Modal.Header closeButton>
                    <Modal.Title className="color-main" dir='rtl'>
                        تعديل بيانات Script
                    </Modal.Title>
                </Modal.Header>
                
                <EditScriptsInfo props={props} />


                
            </Modal>
    </>
)}

