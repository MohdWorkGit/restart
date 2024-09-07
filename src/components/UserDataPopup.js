import React from 'react'
import { Modal, Form, Col, Row} from "react-bootstrap";
import { SpinnerInfinity } from 'spinners-react';

export default function UserDataPopup(props) {
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="color-main">
                        بيانات المستخدم
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body dir="rtl">
                    {props.IsDataLoading ?
                    <center>
                        <SpinnerInfinity size={70} thickness={110} speed={100} color="rgba(175, 154, 125, 1)" secondaryColor="rgba(0, 0, 0, 0.9)" /> 
                    </center>:
                    <>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                الاسم :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control readOnly defaultValue={props.name} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                الإيميل :
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control readOnly defaultValue={props.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="3">
                                رقم الهاتف :
                            </Form.Label>
                            <Col sm="8">
                            <   Form.Control readOnly defaultValue={props.phone} />
                            </Col>
                        </Form.Group>
                    </>
                    }

                </Modal.Body>
            </Modal>
        </>
    )
}
