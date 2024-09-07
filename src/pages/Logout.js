import React, { useEffect } from 'react'
import Cookie from 'universal-cookie'

export default function Logout() {
    useEffect(() => {
        
        const cookie = new Cookie();
        cookie.remove("userID");
        cookie.remove("userRole");
        cookie.remove("userToken");

        window.location.href = '/';

    })
    return (
        <>
            
        </>
    )
}
