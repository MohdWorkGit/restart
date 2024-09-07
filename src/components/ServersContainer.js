import React , { useState } from 'react';
import ServersFilter from './ServersFilter';
import ServerList from './ServerList';
import {withServerConsumer} from "../contexts/AcceptedServersContext";
import Loading from "./Loading";
import Pagination from './Pagination';

function ServersContainer({ context}){
    const [currentPage, setCurrentPage] = useState(1);
    const [serversPerPage, setServersPerPage] = useState(12);

    const { loading, sortedServers, servers } = context;
    
    if (loading) {
        return <Loading/>
    }
    
    const indexOfLastServer = currentPage * serversPerPage;
    const indexOfFirstServer = indexOfLastServer - serversPerPage;
    const currentServers = sortedServers.slice(indexOfFirstServer, indexOfLastServer);


    // change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    return (
        <div className="ServersContainer">
            <ServersFilter servers={servers}/>

            <ServerList servers={currentServers}/>
            
            <Pagination itemsPerPage={serversPerPage}
                totalItems={sortedServers.length}
                paginate={paginate}
                currentPage={currentPage}
                setItemsPerPage={setServersPerPage} />
        </div>
    );
}

export default withServerConsumer(ServersContainer)


//Other method

// import React from 'react';
// import ServersFilter from './ServersFilter';
// import ServerList from './ServerList';
// import {ServerConsumer} from "../Context";
// import Loading from "./Loading";

// export default function ServersContainer() {
    
    
//     return (
//         <ServerConsumer>
//             {(value) =>{
//                 const { loading, sortedServers, servers } = value;
//                 if(loading){
//                     return <Loading/>
//                 }
//                 return (
//                     <div>
//                         Hello from Servers container
//                         <ServersFilter servers={servers}/>
//                         <ServerList servers={sortedServers}/>
//                     </div>
//                 );
//             }}
//         </ServerConsumer>
//     );
// }
