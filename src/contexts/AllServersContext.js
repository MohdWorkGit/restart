import React, { Component, createContext } from 'react'
import axios from 'axios';
import Links from '../Links';
import Cookie from 'universal-cookie';

export const AllServersContext = createContext();

class AllServersContextProvider extends Component {
    state = {
        servers: {},
        loading: true,

    };

    getData() {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(Links.baseLink + `/servers/all`, config).then(
            res => {
                if (res.status === 200) {
                    // console.log(res);
                    this.setState({
                        servers: res.data,
                        loading: false
                    });
                }

            }
        ).catch(error => {
            // console.log(error);
            if (error.response.data.message === "Require Admin Role!") {
                alert("انت لا تملك الصلاحية لدخول الصفحة");
                window.location.href = '/';

            }
            else {
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
            <AllServersContext.Provider value={{ ...this.state }}>
                {this.props.children}
            </AllServersContext.Provider>
        );
    }
}

export default AllServersContextProvider;