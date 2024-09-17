import React, { Component } from 'react'
// import items from "./data";
import axios from 'axios';
import Links from '../Links';
import Cookie from 'universal-cookie';


const ServerContext = React.createContext();

class ServerProvider extends Component {
    state={
        servers:[],
        sortedServers:[],
        loading:true,
        order:"newestFirst",
        searchServer:"",
        updated:false
    };

    getData() {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(Links.baseLink + `/servers/user`, config).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    let maxPrice = Math.max(...res.data.map(item => item.price));
                    let maxCapacity = Math.max(...res.data.map(item => item.capacity));

                    const servers = res.data = res.data.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))


                    this.setState({
                        servers: servers,
                        sortedServers: servers,
                    
                        price: maxPrice,
                        maxPrice: maxPrice,

                        // capacity: maxCapacity,
                        maxCapacity: maxCapacity,
                        loading: false,
                    });
                }

            }
        ).catch(error => {
            console.log(error);
            alert("Something wrong happened try agin");
            window.location.href = '/';
        })
    };


    componentDidMount(){
        this.getData();
    }
    
    update = event => {
        
        this.setState({
            updated: event
        })
    };
    
    handelChange = event => {
        // console.log(event.target.value);
        const value = event.target.value;
        const name1 = event.target.name;
        this.setState({
            [name1]: value,
            updated: true
        }, this.filterServers)
    };


    filterServers = () => {
        let {
            searchServer,
            order,
            servers
        } = this.state;
        
        let tempServers = [...servers];


        // search server
        tempServers = tempServers.filter(v =>
            v.name.toLowerCase().indexOf(searchServer.toLowerCase()) !== -1
        );


        // this part order(sort) the servers
        if (order === "ascending") {
            tempServers = tempServers.sort((a, b) => a.price - b.price)
        }
        else if (order === "descending") {
            tempServers = tempServers.sort((a, b) => b.price - a.price)
        }
        else if (order === "alphabetAZ") {
            tempServers = tempServers.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
        }
        else if (order === "alphabetZA") {
            tempServers = tempServers.sort((a, b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0))
        }
        else if (order === "newestFirst") {
            tempServers = tempServers.sort((a, b) => new Date(b.dateCreated) - new Date(a.dateCreated))
        }
        else if (order === "oldestFirst") {
            tempServers = tempServers.sort((a, b) => new Date(a.dateCreated) - new Date(b.dateCreated))
        }


        this.setState({
            sortedServers: tempServers,
            // price: price
        });
    }


    render() {
        return (
            <ServerContext.Provider value={{
                ...this.state,
                handelChange: this.handelChange,
                update: this.update
                }}>
                {this.props.children}
            </ServerContext.Provider>
        )
    }
}

const ServerConsumer = ServerContext.Consumer;

export function withServerConsumer(Component){
    return function ConsumerWrapper(props){
        return <ServerConsumer>
            {value => <Component {...props} context={value}/>}
        </ServerConsumer>
    }
}

export{ServerProvider, ServerConsumer, ServerContext};