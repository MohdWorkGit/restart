import React, {useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import axios from 'axios'
import Links from '../Links'
import Cookie from 'universal-cookie'

import { Icon } from 'react-icons-kit'
import { bin } from 'react-icons-kit/icomoon/bin'
import { edit } from 'react-icons-kit/ionicons/edit'

import EditScriptPopup from './EditScriptPopup';


export default function EditServerScripts({props}) {

    const server = props.row.id;

    const [name, setName] = useState("");
    const [command, setCommand] = useState("");
    const [sshPass, setSshPass] = useState("");
    const [sshUser, setSshUser] = useState(""); 
    
    const [ShowEditScriptPopup, setShowEditScriptPopup] = useState(false);
    const [scriptEdit, setscriptEdit] = useState("");
    
    const Scripts = props.scripts 
    
    const deleteScript = (event, script) =>{
        // console.log(img);
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

   
        axios.delete(Links.baseLink + `/scripts/`+script.id, config).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    alert("تم ازاله الصور")
                }
            }).catch(error => {
                console.log(error);
            });

    };


    const handelSubmit = event => {
        event.preventDefault();

        const NewScript = {
            name,
            command,
            sshPass,
            sshUser
        }

        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.post(Links.baseLink + `/scripts/server/` + server, NewScript, config).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    alert("تم اضافة command")
                    window.location.reload(false);


                }
            }).catch(error => {
                console.log(error);
                alert("يوجد خلل في الخادم ارجو المحاولة لاحقا")

            });
    }

    const handelEditClick = (scr) => {
        setscriptEdit(scr)

        setShowEditScriptPopup(true);
    };

    return (
        <>

        <div className="container">
            <div className="row">
                <div className="col-1"/>
                <div className="col-10">
                    <h3> اضافة Command</h3>
                    <form onSubmit={handelSubmit}>
                            <Form.Group className="mb-3" onChange={e => setName(e.target.value)}>
                                <Form.Label>:Name </Form.Label>
                                <Form.Control type="text" name="name" />
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={e => setSshUser(e.target.value)}>
                                <Form.Label>SSH user Name</Form.Label>
                                <Form.Control type="text" name="name" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={e => setSshPass(e.target.value)}>
                                <Form.Label>:كلمة المرور</Form.Label>
                                <Form.Control type="password" placeholder="" name="password" />
                            </Form.Group>

                            <Form.Group className="mb-3" onChange={e => setCommand(e.target.value)}>
                                <Form.Label>SSH command</Form.Label>
                                <Form.Control type="text" name="name" />
                            </Form.Group>

                        <br />
                    <button type="submit" className="btn-primary">  إضافة Command</button>

                    </form>
                <br />
                <hr/>
                <h3>   ال Commands المضافة</h3>
                {Scripts?.map((scr, index )=> (
                    <>
                        <p>{scr.name}</p>
                        <Button variant="btn btn-danger" 
                            className="image-item-btn"
                            onClick={(event) => deleteScript(event, scr)}
                        > 
                        <div style={{ color: '#ffffff' }}>
                                <Icon size={18} icon={bin} />
                        </div>
                        </Button>

                        <Button variant="btn btn-normal" 
                            className="btn btn-outline"
                            onClick={() => handelEditClick(scr)}
                        > 
                        <div style={{ color: '#0e0e0e' }}>
                            <Icon size={18} icon={edit} />
                        </div>
                        </Button>
                    </>
                ))
                }
                </div>
            </div>
        </div>
        
        

        <EditScriptPopup
            show={ShowEditScriptPopup}
            scriptEdit={scriptEdit}
            onHide={() => setShowEditScriptPopup(false)}
            />

        </>

        
    )
}
