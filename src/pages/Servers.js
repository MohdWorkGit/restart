import React, { Component } from 'react'
import Hero from "../components/Hero"
import Banner from '../components/Banner'
import { Link } from 'react-router-dom'
import ServersContainer from '../components/ServersContainer'

// import Map from '../components/Map'
import Title from '../components/Title';
import { ServerProvider } from "../contexts/AcceptedServersContext";


export default class Servers extends Component {
    render() {
        return (
            <>
                <ServerProvider>
                    <br /><br />
                    <ServersContainer />
                    <br /><br /><br /><br />

                </ServerProvider>
            </>
        )
    }
}

