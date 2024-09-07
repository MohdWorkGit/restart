import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form } from "react-bootstrap";
import Cookie from 'universal-cookie'
import axios from 'axios';

import { UserContext } from '../contexts/UserContext';

import Title from "../components/Title";
import Links from '../Links';

export default function Login() {
    const { setIsLoggedIn} = useContext(UserContext);

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handelSubmit = event => {
        event.preventDefault();

        const user = {
            "name": name,
            "password": password

        }

        if ((name && password) !== "") {
            axios.post(Links.baseLink + "/users/login", user).then(
                res => {
                    if (res.status === 200) {

                        // store users data
                        const cookies = new Cookie();

                        console.log(res);
                        
                        cookies.set('userID', res.data.id,
                            { path: '/', expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)});

                        cookies.set('userRole', res.data.role,
                            { path: '/', expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)});

                        cookies.set('userToken', res.data.token,
                            { path: '/', expires: new Date(new Date().getTime() + 6 * 60 * 60 * 1000)});


                        setIsLoggedIn(true);
                        // sessionStorage.setItem('userID', res.data.id);

                        // go to servers page
                        navigate("/");

                    }
                })
                .catch(error => {
                    if (error.response.data === "The user not found") {
                        alert("لم يتم العثور على حساب مبطابق للبيانات");
                    }
                    else if (error.response.data === "password is wrong!") {
                        alert("كلمة المرور غير صحيحة ");
                    }
                    else{
                        console.log(error.response)
                        alert("يوجد عطل في الخادم ارجو المحاولة لاحقا");
                    }
                })
        }
        else {
            // empty input
            alert("يجب تعبئة كل الحقول");
        }
    };
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-2 col-md-1 col-xl-3" />
                    <div className="col-sm-12 col-md-12 col-xl-6">
                        <br/><br/>
                        <Title title=" مرحباً بك مجدداً" className="form-title"></Title>
                        <div className="Form">
                            <form onSubmit={handelSubmit}>
                                <h3>تسجيل الدخول</h3>

                                <Form.Group className="mb-3" onChange={e => setName(e.target.value)}>
                                    <Form.Label>أسم المستخدم</Form.Label>
                                    <Form.Control type="name" name="name" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setPassword(e.target.value)}>
                                    <Form.Label>كلمة المرور</Form.Label>
                                    <Form.Control type="password" placeholder="" name="password" />
                                </Form.Group>

                                <br />
                                <button type="submit" className="btn-primary">تسجيل الدخول</button>
                              

                                <p className="register text-right">
                                    ليس لديك حساب؟ <Link to="/register"> إنشاء حساب </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>            
        </>
    );
}
