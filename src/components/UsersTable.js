import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Links from '../Links';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/ionicons/edit';
import { closeRound } from 'react-icons-kit/ionicons/closeRound';
import { Form } from "react-bootstrap";
import Cookie from 'universal-cookie';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditUserPopup from './EditUserPopup';

export default function UsersTable({ users = [] }) {

    const [modalShow, setModalShow] = useState(false);
    const [Row, setRow] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);


    const handelEditClick = (row) => {
        setRow(row);
        setName(row.name);
        
        setModalShow(true);
    };

    const handelDeleteClick = (row) => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.delete(`${Links.baseLink}/users/${row.id}`, config).then(
            res => {
                if (res.status === 200) {
                    alert("Account deleted");
                    window.location.reload(false);
                }
            });
    };

    const handelChangeRoleClick = (value, id) => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        const change = { role: value };

        axios.put(`${Links.baseLink}/users/changeRole/${id}`, change, config).then(
            res => {
                if (res.status === 200) {
                    alert("تم تغير دور المستخدم");
                    window.location.reload(false);
                }
            }
        ).catch(error => {
            console.log(error.response);
        });
    };

    const columns = useMemo(() => [
        {
            accessorKey: 'index',
            header: '#',
            cell: (info) => <center>{info.row.index + 1}</center>,
            size: 50,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: (info) => <center>{info.getValue()}</center>,
        },
        {
            accessorKey: 'id',
            header: 'ID',
            cell: (info) => <center>{info.getValue()}</center>,
        },
        {
            accessorKey: 'role',
            header: 'Role',
            cell: (info) => (
                <center>
                    <Form.Group>
                        <Form.Select
                            defaultValue={info.getValue()}
                            className={info.getValue() === "admin" ? "color-green" : info.getValue() === "host" ? "color-orange" : null}
                            onChange={(e) => {
                                if (window.confirm(`هل ترغب بتغير دور هذا المستخدم الى ${e.target.value} ؟`))
                                    handelChangeRoleClick(e.target.value, info.row.original.id);
                            }}
                        >
                            <option style={{ color: "#ff9d00" }} value="admin">Admin</option>
                            <option style={{ color: "#1fa51f" }} value="host">Host</option>
                            <option value="user">User</option>
                        </Form.Select>
                    </Form.Group>
                </center>
            ),
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: (info) => (
                <center>
                    <button className="btn btn-outline" onClick={() => handelEditClick(info.row.original)}>
                        <Icon size={28} icon={edit} />
                    </button>
                    <button className="btn btn-outline big-btn" onClick={() => {
                        if (window.confirm('هل ترغب بحذف هذا المستخدم ؟'))
                            handelDeleteClick(info.row.original);
                    }}>
                        <div style={{ color: '#ff0000' }}>
                            <Icon size={28} icon={closeRound} />
                        </div>
                    </button>
                </center>
            ),
        }
    ], [users]);

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel() 
    });

    return (
        <>
        <div>
            <div className="card-center">
                <table className="table table-striped table-hover">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Pagination */}
                <div className="pagination">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        {'<<'}
                    </button>{' '}
                    <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {'>>'}
                    </button>{' '}
                    <span>
                        Page{' '}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                        </strong>{' '}
                    </span>
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            table.setPageSize(Number(e.target.value));
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
        
        <EditUserPopup
                show={modalShow}
                row={Row}
                onHide={() => setModalShow(false)}
                name={name}
                setname={setName}

                password={password}
                setPassword={setPassword}
            />

    </>

    );
}
