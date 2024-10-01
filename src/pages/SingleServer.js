import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import axios from 'axios';
import Links from '../Links';
import Cookie from 'universal-cookie';
import { SpinnerDotted } from 'spinners-react';


import moment from 'moment';

import { Icon } from 'react-icons-kit'

import { calendar } from 'react-icons-kit/icomoon/calendar'
import { group } from 'react-icons-kit/fa/group'

import LiveSSHOutput from '../components/LiveSSHOutput';

import { Button } from 'react-bootstrap'


function withRouter(Component) {
    return (props) => <Component {...props} params={useParams()} />;
  }

export default withRouter(class SingleServer extends Component {
    
    state = {
        id: this.props.params.id,
        modalShow:false,
        loading: true,
        server: {},
        scripts:{},
        runScript: null,
        notFound:false,
        runScripts:[]
    };   
    // static contextType = ServerContext;

    config = {
        headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
    };
    
    getData() {
        axios.get(Links.baseLink + `/servers/byId/` +this.state.id, this.config ).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    this.setState({
                        server: res.data,
                    });
                }

            }
        ).catch(error => {
            console.log(error);
            this.setState({
                notFound: true,
                loading: false,
            });
        })

        axios.get(`${Links.baseLink}/scripts/byServer/${this.state.id}`, this.config)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        scripts: res.data,
                        loading: false,
                    });
                }
            })
            .catch(error => {
                console.log(error.response);
                this.setState({
                    notFound: true,
                    loading: false,
                });
            });
    };

    componentDidMount() {
        this.getData();
    }

    handleRunScript (event) {
        this.setState((prevState) => ({
            runScripts: [
                {id: event.id , command: event.command, key: Math.random()},
                ...prevState.runScripts
            ]
        }))
    }
    
    handleDeleteScript(event){
        this.setState((prevState) => ({
            runScripts : prevState.runScripts.filter(script => script.key !== event.key)
        }))
    }
    

    

    render() {  
        
        if (this.state.notFound) {
            return (
                <div className="error">
                    <br/><br/>
                    <h3>could not find this server</h3>

                    <Link to="/servers" className="btn-primary">
                        Back to Servers
                    </Link>
                </div>)
        }

        if (this.state.loading) {
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
                
                <div className="container">
                <div className="row">
                <div className="col-12">

                    <section className="single-room">
            
                        <div className="single-room-info" dir='rtl'>

                            <article className="info">
                                <h3>بيانات server </h3>
                                        <h6 dir='rtl'> الاسم :: {this.state.server.name}</h6>
                                        <h6 dir='rtl'> IP : {this.state.server.ip}   <Icon size={20} icon={group} /></h6>
                                        <h6 dir='rtl'>أُضيف : {moment(this.state.server.dateCreated).format('YYYY/MM/DD')} <Icon size={20} icon={calendar} /></h6>
        

                            </article>
                        </div>

                        <h3 dir='rtl'>   ال Commands المضافة</h3>
                        <section className="roomslist" dir="rtl">
                            <div className="roomslist-center" style={{ whiteSpace:'nowrap' }}>
                                {this.state.scripts?.map((scr, index )=> (
                                    <div className='room-info' style={{ display:'inline-block', whiteSpace:'nowrap', alignContent:'center', textAlign:'center' }}>
                                        <p>{scr.name}</p>
                                        <Button variant="btn btn-danger" 
                                            className="image-item-btn"
                                            // onClick={(event) => this.setState({
                                            //     runScript: scr.id,
                                            // })}
                                            onClick={() => this.handleRunScript(scr)}
                                        > 
                                        Run
                                        </Button>
                                    </div>
                                ))
                                }
                            </div>
                        </section>
                    </section>

                    
                        {/* {this.state.runScript?
                        <LiveSSHOutput scriptId={this.state.runScript} />                
                        :null} */}

                        {this.state.runScripts.map((script) => (
                            <div key={script.key}>
                                <LiveSSHOutput scriptId={script.id} command={script.command} script={script} onDelete={() => (this.handleDeleteScript(script))} />
                            </div>
                        ))
                        }
                    
                

            </div>
            </div>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
                
            </>
        )
    }
}
)
