import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Container} from 'react-bootstrap';
import axios from 'axios'

import Title from "../components/Title"
import Links from '../Links'

export default function Register() {
    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handelSubmit = event => {
        event.preventDefault();


        const user = {
            "name": name,
            "password": password

        }
        if ((name       
            && password
            && rePassword) !== null) {

            if (password === rePassword) {
                if (password.length >= 8){

                    axios.post(Links.baseLink + "/users/register", user).then(
                        res => {
                            // console.log(res);
                            if (res.status === 200) {
                                
                                // go to login page
                                navigate("/login");
                            }
                        }).catch(error => {
                            console.log(error.response)
                            alert("حاول مرة اخرى");
                        });
                    }
                    else{
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
        <>
            <Container>
                <div className="row">
                <div className="col-md-2 col-md-1 col-xl-3"/>
                <div className="col-sm-12 col-md-12 col-xl-6">
                    <br/><br/>
                    <Title title=" مرحباً بك" className="form-title"></Title>
                    <div className="Form">
                        <form onSubmit={handelSubmit}>
                            <h3>إنشاء حساب جديد </h3>

                            <Form.Group className="mb-3" onChange={e => setName(e.target.value)}>
                                <Form.Label>:اسم المستخدم</Form.Label>
                                <Form.Control type="text" name="name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setPassword(e.target.value)}>
                                <Form.Label>:كلمة المرور</Form.Label>
                                <Form.Control type="password" placeholder="" name="password" />
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={e => setRePassword(e.target.value)}>
                                <Form.Label>:اعادة كلمة المرور</Form.Label>
                                <Form.Control type="password" placeholder="" name="rePassword" />
                            </Form.Group>
                            <br />
                            <button type="submit" className="btn-primary">انشاء حساب </button>

                            <p className="forgot-password text-right">
                                لديك حساب؟<Link to="/login">تسجيل الدخول </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            </Container>
        </>
    )
}

