import React, { Component } from 'react'
import axios from 'axios'
import Links from '../Links'
import { Form} from "react-bootstrap"
import Cookie from 'universal-cookie'
import Title from './Title'
import Select from 'react-select'
import Loading from "./Loading";




export default class AddNewServerAdmin extends Component {
    state = {
        name: null,
        usersID:[],
        owenerID: null,
        ip:null,
        users : [],
        loading: true,
        options: [],
    };

    getData() {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(Links.baseLink + `/users`, config).then(
            res => {
                // console.log(res);
                if(res.status === 200)
                {    
                    this.setState({ 
                        users : res.data,
                        loading : false});
                    this.popOptions();
                }
                
            }
        ).catch(error => {
            // console.log(error.response);
            if (error.response.data.message === "Require Admin Role!"){
                alert("انت لا تملك الصلاحية لدخول الصفحة");
                window.location.href = '/';

            }
            else{
                alert("Something wrong happened try agin");
                window.location.href = '/';
            }
        })
    };


    
    handelChange = event =>{
        // console.log(event.target.name);
        this.setState({ [event.target.name]: event.target.value });
    };

    handelChangeId = event =>{
        
        const selectedIDS = event ? event.map(option => option.value) : [];
        this.setState({ usersID: selectedIDS });
    };

    handelChangeOwnerId = event =>{
        this.setState({ owenerID: event.value });
    };

    handelSubmit = event =>{
        event.preventDefault();
        // console.log(this.state);

        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        
        if ((this.state.name 
            && this.state.usersID) !== null){

                
                const server={
                    usersID: this.state.usersID,
                    name: this.state.name,
                    ip: this.state.ip,
                    owenerID: this.state.owenerID
                }

                axios.post(Links.baseLink + "/servers/create", server, config).then(
                res =>{
                    // console.log(res);
                    if (res.status === 200){
                        // go to home page
                        window.location.href = '/';
                    }
                }).catch(error => {
                    console.log(error);
                });
        }
        else{
            alert("يجب تعبئة كل الحقول");
        }
    };

    popOptions(){
        this.state.users.map(user =>(
            this.state.options.push({value: user.id, label:user.name})
        ))
    }

    componentDidMount() {
        this.getData();
    }
        
    render() {
        if (this.state.loading) {
            return <Loading />
        }

        if (new Cookie().get("userToken") === undefined){
            alert("يجب عليك تسجيل الدخول")
            window.location.href = '/login';
        }
        return (
                <div className="container">
                    <br/>
                    <Title title="New Server" />
                    <div className="row">
                    <div className="col-md-2 col-md-1 col-xl-3" />
                    <div className="col-sm-12 col-md-12 col-xl-6">
                    <div className="Form" >
                     <div >
                    <form onSubmit={this.handelSubmit}>
                        
                        <Form.Group className="mb-3"  onChange={this.handelChangeOwnerId}>
                            <Form.Label dir="rtl"> صاحب ال Server : </Form.Label>
                            <Select options={this.state.options} onChange={this.handelChangeOwnerId}/>
                        </Form.Group>

                        <Form.Group className="mb-3"  onChange={this.handelChange}>
                            <Form.Label dir="rtl">المستخدمون: </Form.Label>
                            <Select options={this.state.options} onChange={this.handelChangeId} isMulti/>
                        </Form.Group>

                        <Form.Group className="mb-3"  onChange={this.handelChange}>
                            <Form.Label>:الاسم</Form.Label>
                            <Form.Control type="text" name="name"/>
                        </Form.Group>

                        <Form.Group className="mb-3"  onChange={this.handelChange}>
                            <Form.Label>:IP Address</Form.Label>
                            <Form.Control type="text" name="ip"/>
                        </Form.Group>
                        
                        <br />
                        <button type="submit" className="btn-primary">  إضافة</button>
                    </form>
                    <br />

                    <p className="text-muted" dir="rtl">
                        ! يمكنك إضافه باقي بيانات Server
                    </p>
                </div>
            </div>
            </div>
            </div>
            </div>

        )
    }
}
