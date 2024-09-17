import React, { useState, useEffect } from 'react';
import { Form, Row} from "react-bootstrap";
import Cookie from 'universal-cookie'
import axios from 'axios';
import Links from '../Links';
import Select from 'react-select'
import { SpinnerDotted } from 'spinners-react';



export default function EditUserInfo({props}) {

    const[loading, setLoading] = useState(false)

    


    const handelSubmit = event => {

        // console.log(props.Row)

        event.preventDefault();

        const change = {
            name: props.name,
            password: props.password
       
        }
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };
        axios.put(Links.baseLink + "/users/" + props.row.id, change, config).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    alert("تم تعديل الserver ")
                    window.location.reload(false);

                }
            }).catch(error => {
                console.log(error);
                alert("يوجد خلل في الخادم ارجو المحاولة لاحقا");
            });
    };

   

    if (loading) {
        return(
            <center>
                <br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br />
                <SpinnerDotted
                    size={80} thickness={125} speed={100}
                    color="rgba(175, 154, 125, 1)"
                    secondaryColor="rgba(0, 0, 0, 1)" />
            </center>
        )
    }


    return (
        <>
            <form onSubmit={handelSubmit}>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label> id :</Form.Label>
                    <Form.Control readOnly defaultValue={props.Row.id} />
                </Form.Group> */}
                
                <Form.Group as={Row} className="mb-3" onChange={(e) => props.setname(e.target.value)}>
                    <Form.Label >الاسم:</Form.Label>
                    <Form.Control defaultValue={props.name} type="text" name="name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => props.setPassword(e.target.value)}>
                    <Form.Label>:كلمة المرور</Form.Label>
                    <Form.Control type="password" placeholder="" name="password" />
                </Form.Group>

                
                <br/>
                <button type="submit" className="btn-primary">  تعديل</button>
            </form>
        </>
    )
}
