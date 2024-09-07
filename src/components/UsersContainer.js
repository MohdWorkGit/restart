import React, { Component } from 'react';
import Loading from "./Loading";
import { UsersContext } from '../contexts/AllUsersContext';

import UsersTable from './UsersTable';


export default class UsersContainer extends Component {
    static contextType = UsersContext;
    render() {
        const { users, loading} = this.context;
    
        if (loading) {
            return <Loading />
        }

        return (
            <>
                <UsersTable users={users} />
            </>
        )
    }
}

