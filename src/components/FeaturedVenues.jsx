import React, { useState, useEffect } from 'react'
import Server from './Server';
import Title from './Title';
import Links from '../Links';
import axios from 'axios';
import { SpinnerDiamond } from 'spinners-react';


export default function FeaturedServers() {
    const [Servers, setServers] = useState([]);
    const [isLoading, setLoading] = useState(true)

    function getData(){
        axios.get(Links.baseLink + `/servers/get/featured`).then(
            res => {
                // console.log(res);
                if (res.status === 200) {
                    setServers(res.data);
                    setLoading(false);
                }

            }
        ).catch(error => {
            console.log(error);
            // alert("Something wrong happened try agin");
            // window.location.href = '/';
        })
    };

    useEffect(() => {
        getData();
    },[]);

    useEffect(() => {
        
    });

    return (
        <section className="featured-rooms">
            <Title title="القاعات المميزة" />

            <div className="featured-rooms-center">
                {isLoading ? 
                <center>
                    <br /><br />
                        <SpinnerDiamond size={80} thickness={125} 
                        speed={100} 
                        color="rgba(175, 154, 125, 1)" 
                        secondaryColor="rgba(0, 0, 0, 1)" />
                </center>:

                Servers.map(server => {
                    return <Server key={server.id} server={server}/> })
                }
            </div>

        </section>
    )
}

