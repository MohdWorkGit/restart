import React, {useState} from 'react'
import { Form, Row} from "react-bootstrap";
import Cookie from 'universal-cookie'
import axios from 'axios';
import Links from '../Links';

export default function EditScriptsInfo({props}) {

    const [NewName, setNewName] = useState(props.scriptEdit.name);
    const [NewCommand, setNewCommand] = useState(props.scriptEdit.command);
    const [NewSshPass, setNewSshPass] = useState(props.scriptEdit.sshPass);
    const [NewSshUser, setNewSshUser] = useState(props.scriptEdit.sshUser); 

    
    const handelSubmit = event => {

        // console.log(props.Row)

        event.preventDefault();

        const change = {
            name: NewName,
            command: NewCommand,
            sshPass: NewSshPass,
            sshUser: NewSshUser
        }
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };
        axios.put(Links.baseLink + "/scripts/" + props.scriptEdit.id, change, config).then(
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
                <Form.Group className="mb-3" onChange={e => setNewName(e.target.value)}>
                    <Form.Label>:Name </Form.Label>
                    <Form.Control defaultValue={NewName} type="text" name="name" />
                </Form.Group>

                <Form.Group className="mb-3" onChange={e => setNewSshUser(e.target.value)}>
                    <Form.Label>SSH user Name</Form.Label>
                    <Form.Control defaultValue={NewSshUser} type="text" name="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setNewSshPass(e.target.value)}>
                    <Form.Label>:كلمة المرور</Form.Label>
                    <Form.Control defaultValue={NewSshPass} type="password" placeholder="" name="password" />
                </Form.Group>

                <Form.Group className="mb-3" onChange={e => setNewCommand(e.target.value)}>
                    <Form.Label>SSH command</Form.Label>
                    <Form.Control defaultValue={NewCommand} type="text" name="name" />
                </Form.Group>

                
                <br/>
                <button type="submit" className="btn-primary">  تعديل</button>
            </form>
        </>
    )
}
