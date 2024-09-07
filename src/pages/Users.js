import React from 'react';
import Title from '../components/Title';
import UsersContextProvider from "../contexts/AllUsersContext";
import UsersContainer from '../components/UsersContainer';


export default function Users() {
    return (
        <>
            <br /><br /><br /><br />
            < Title title="Users" />

            <UsersContextProvider>    
                <UsersContainer />
            </UsersContextProvider>
            
        </>
    )
}

