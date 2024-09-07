import React from 'react'
import Server from './Server'

export default function ServerList({ servers, Lounges}) {
    if(servers.length ===0){
        return(
            <div className="empty-search">
                <h3> لا توجد نتيجة للبحث</h3>
            </div>
        )
    }
    


    return (
        <section className="roomslist" dir="rtl">
            <div className="roomslist-center">
                {
                    servers.map(server =>{
                        return <Server key={server.id} server={server}/>
                    })
                }
            </div>
        </section>
    )
}
