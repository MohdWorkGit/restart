import React from 'react'
import { Form, Row} from "react-bootstrap";
import Cookie from 'universal-cookie'
import axios from 'axios';
import Links from '../Links';

export default function EditServerInfo({props}) {
    const handelSubmit = event => {

        // console.log(props.Row)

        event.preventDefault();

        const change = {
            name: props.Name,
            ip: props.IP
        }
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };
        axios.put(Links.baseLink + "/servers/" + props.Row.id, change, config).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    alert("تم تعديل الserver ")
                    window.location.reload(false);

                }
            }).catch(error => {
                console.log(error);
                alert("يوجد خلل في الخادم ارجو المحاولة لاحقا")

            });
    };

    return (
        <>
            <form onSubmit={handelSubmit}>
                {/* <Form.Group as={Row} className="mb-3">
                    <Form.Label> id :</Form.Label>
                    <Form.Control readOnly defaultValue={props.Row.id} />
                </Form.Group> */}
                
                <Form.Group as={Row} className="mb-3" onChange={(e) => props.setName(e.target.value)}>
                    <Form.Label >الاسم:</Form.Label>
                    <Form.Control defaultValue={props.Name} type="text" name="name" />
                </Form.Group>

                <Form.Group as={Row} className="mb-3" onChange={(e) => props.setIP(e.target.value)}>
                    <Form.Label >ip:</Form.Label>
                    <Form.Control defaultValue={props.IP} type="text" name="name" />
                </Form.Group>

                
                <br/>
                <button type="submit" className="btn-primary">  تعديل</button>
            </form>
        </>
    )
}
