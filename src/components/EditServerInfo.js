import React, { useState, useEffect } from 'react';
import { Form, Row} from "react-bootstrap";
import Cookie from 'universal-cookie'
import axios from 'axios';
import Links from '../Links';
import Select from 'react-select'
import { SpinnerDotted } from 'spinners-react';



export default function EditServerInfo({props}) {

    const [Users, setUsers] = useState(null); 
    const [Options, setOptions] = useState(null);

    const [defaultUsers, setDefaultUsers] = useState(null)

    const[loading, setLoading] = useState(true)

    const getusers = () => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(Links.baseLink + `/users`, config)
        .then(res => {
                if(res.status === 200)
                {    
                    // console.log("HERE",res.data)
                    setUsers(res.data);

                }
                
            }
        ).catch(error => {
            if (error.response === "Require Admin Role!"){
                alert("انت لا تملك الصلاحية لدخول الصفحة");
                window.location.href = '/';

            }
            else{
                console.log(error)
                alert("Something wrong happened try agin");
                // window.location.href = '/';
            }
        })
    };

    const popOptions = () => {
        const newUsers = []
        Users?.map(user =>(
            newUsers.push({value: user.id, label:user.name})
        ))
        setOptions(newUsers);
    }


    const handelSubmit = event => {

        // console.log(props.Row)

        event.preventDefault();

        const userIDsValue = props.usersID.map(user => user.value)

        const change = {
            name: props.name,
            ip: props.ip,
            usersID: userIDsValue,
        }
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };
        axios.put(Links.baseLink + "/servers/" + props.row.id, change, config).then(
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

    useEffect(() => {
        getusers();
    },[]);

    useEffect(() => {
        popOptions();
    },[Users]);

    useEffect(() => {
        // Find the default users based on the default IDs
        setDefaultUsers(Options?.filter(option => props.usersID.includes(option.value)));
        if(defaultUsers?.length > 0){
            setLoading(false)
        }
        

    },[Options]);

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

                <Form.Group as={Row} className="mb-3" onChange={(e) => props.setip(e.target.value)}>
                    <Form.Label >ip:</Form.Label>
                    <Form.Control defaultValue={props.ip} type="text" name="name" />
                </Form.Group>

                <Form.Group className="mb-3"  onChange={props.handelChangeId}>
                    <Form.Label dir="rtl">المستخدمون: </Form.Label>
                    <Select defaultValue={defaultUsers} options={Options} onChange={props.handelChangeId} isMulti/>
                </Form.Group>

                
                <br/>
                <button type="submit" className="btn-primary">  تعديل</button>
            </form>
        </>
    )
}
