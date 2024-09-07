import React from 'react'
import AllServersContextProvider from '../contexts/AllServersContext'
import AllServersContainer from '../components/AllServersContainer'
import Title from '../components/Title'

export default function AllServers() {
    return (
        <>
            <br /><br /><br /><br />
            < Title title="All Servers Table" />

            <AllServersContextProvider>
                <AllServersContainer />
            </AllServersContextProvider>
        </>
    )
}
