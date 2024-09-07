import React, { useState } from 'react'
import { Form, Container } from 'react-bootstrap';
import axios from 'axios'

import Title from "../components/Title"
import Links from '../Links'
import { withRouter, RouteComponentProps } from "react-router";

export default function NewPassword(props) {
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handelSubmit = event => {
        event.preventDefault();
        // console.log(props.match.params.token);

        if ((password
            && rePassword) !== null) {

            if (password === rePassword) {
                if (password.length >= 8) {

                    const config = {
                        headers: { Authorization: `Bearer ${props.match.params.token}` }
                    };

                    const change = {
                        "password": password
                    }

                    axios.put(Links.baseLink + "/users/me/password", change, config).then(
                        res => {
                            // console.log(res);
                            if (res.status === 200) {
                                alert("تم التعديل بنجاح");
                                // go to login page
                                window.location.href = "/login";
                            }
                        }).catch(error => {
                            console.log(error.response)
                            alert("حاول مرة اخرى");
                        });
                }
                else {
                    alert("كلمة المرور قصيرة");
                }
            }
            else {
                // password don't match
                alert("كلمتا المرور غير متطابقتا");
            }

        }
        else {
            // empty input
            alert("يجب تعبئة كل الحقول");
        }
    };
    return (
        <div>
            <>
                <Container>
                    <div className="row">
                        <div className="col-md-2 col-md-1 col-xl-3" />
                        <div className="col-sm-12 col-md-12 col-xl-6">
                            <br /><br />
                            <Title title=" مرحباً بك" className="form-title"></Title>
                            <div className="Form">
                                <form onSubmit={handelSubmit}>
                                    <h3>تغير كلمة المرور</h3>

                                    
                                    <Form.Group className="mb-3" onChange={e => setPassword(e.target.value)}>
                                        <Form.Label>: كلمة المرور</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" onChange={e => setRePassword(e.target.value)}>
                                        <Form.Label>:اعادة كلمة المرور</Form.Label>
                                        <Form.Control type="password" placeholder=""/>
                                    </Form.Group>
                                    <br />
                                    <button type="submit" className="btn-primary">تغير </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </>
        </div>
    )
}
