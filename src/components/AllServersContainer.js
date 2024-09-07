import React, { Component } from 'react'
import Loading from "./Loading";
import AllServersTable from './AllServersTable';

import { AllServersContext } from '../contexts/AllServersContext';


export default class AllServersContainer extends Component {
    static contextType = AllServersContext;

    render() {
        const { servers, loading } = this.context;

        if (loading) {
            return <Loading />
        }

        return (
            <>
                <AllServersTable servers={servers} />
            </>
        )
    }
}
