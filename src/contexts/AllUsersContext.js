import React, { Component, createContext } from 'react'
import axios from 'axios';
import Links from '../Links';
import Cookie from 'universal-cookie';

export const UsersContext = createContext();

class UsersContextProvider extends Component {
    state = {
        users : {},
        loading: true,
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

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <UsersContext.Provider value={{...this.state}}>
                {this.props.children}
            </UsersContext.Provider>
        );
    }
}

export default UsersContextProvider;