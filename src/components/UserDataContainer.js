import React from 'react'
import { ListGroup } from 'react-bootstrap'

export default function UserDataContainer({name, email, phone}) {
    return (
        <>
            <ListGroup column sm="3">
                <ListGroup.Item>الاسم : {name} </ListGroup.Item>
            </ListGroup>
        </>
    )
}
