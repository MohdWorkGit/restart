import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from "../images/defaultimg1.svg"
import PropTypes from "prop-types"

// TODO: change the default image
export default function Server({ server, destination = "servers"}) {
    const { name, id, ip } = server;
    
    return (
        <article >
            {/* <a href={`/${destination}/${id}`} style={{ color: "black", textDecoration: "none"}}>
                <p className="room-info"> {name} </p>
            </a> */}

            <Link to={{ pathname: `/SingleServer/${id}`}} >
                <p className="room-info" style={{ height:200, alignContent:'center', textAlign:'center' }}> {name} </p>
            </Link>


        </article>
    )
}

Server.propTypes = {
    server: PropTypes.shape({
        name:PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    })
};
