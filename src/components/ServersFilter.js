import React from 'react';
import { useContext } from 'react';
import { ServerContext } from '../contexts/AcceptedServersContext';
import { Col, Form, InputGroup, Row } from 'react-bootstrap';

import { Icon } from 'react-icons-kit'
import { search } from 'react-icons-kit/icomoon/search'
import { user } from 'react-icons-kit/fa/user'
export default function ServersFilter({servers}) {
    const context = useContext(ServerContext);
    const {
        handelChange,
        order,
        searchServer,
     
    } = context
    const submitHandler = (e) =>{
        e.preventDefault();
    }

    return (
        <section>

            <form horizontal className="col-sm-6 offset-sm-3" onSubmit={submitHandler}>
            <p className="text-muted" dir="rtl">تعديل خصائص البحث</p>
                <Row>
                    <Col>
                        <Form.Group className="form-group" >
                        <Form.Label dir="rtl">بحث عن server:</Form.Label>
                        <InputGroup size="sm">
                            <InputGroup.Text> <Icon size={22} icon={search} /> </InputGroup.Text>
                            <Form.Control name="searchServer" size="sm" type="text"  dir="rtl" placeholder="اسم server"
                                onChange={handelChange}
                            />
                        </InputGroup>
                        </Form.Group>
                    </Col>
             
                    <Col>
                    <Form.Group className="form-group" >
                        <Form.Label dir="rtl">الترتيب: </Form.Label>
                        <Form.Select name="order" defaultValue={order}
                            onChange={(e) => handelChange(e)}>
                            <option value="newestFirst">الاحدث </option>
                            <option value="oldestFirst">الاقدم</option>
                            <option value="alphabetAZ">أبجدي تصاعدي</option>
                            <option value="alphabetZA">أبجدي تنازلي</option>
                        </Form.Select>
                    </Form.Group>
                    </Col>
                </Row>          
            </form>
            <br/><br/><br/>
        </section>
    );
}
