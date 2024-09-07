import React, { useState, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';
import Links from '../Links';
import { Icon } from 'react-icons-kit';
import { edit } from 'react-icons-kit/ionicons/edit';
import { closeRound } from 'react-icons-kit/ionicons/closeRound';
import { ic_north_east_outline } from 'react-icons-kit/md/ic_north_east_outline';
import { user } from 'react-icons-kit/metrize/user';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import Cookie from 'universal-cookie';
import EditServerPopup from './EditServerPopup';
import UserDataPopup from './UserDataPopup';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom'


export default function AllServersTable({ servers = [], showAdminFeatures = true }) {
    // states used in user data popup
    const [ShowUserPopup, setShowUserPopup] = useState(false);
    const [UserName, setUserName] = useState(null);

    const [IsDataLoading, setIsDataLoading] = useState(true);

    // states for edit server popup
    const [modalShow, setModalShow] = useState(false);
    const [Row, setRow] = useState(null);

    const [Name, setName] = useState(null);
    const [IP, setIP] = useState(null);

    const [Scripts, setScripts] = useState(null)
 


    const handelEditClick = (row) => {
        setRow(row);
        setName(row.name);
        setIP(row.ip);
        getServerScripts(row.id)
 
        setModalShow(true);
    };

    const handelDeleteClick = (row) => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.delete(`${Links.baseLink}/servers/${row.id}`, config)
            .then(res => {
                if (res.status === 200) {
                    alert("Server deleted");
                    window.location.reload(false);
                }
            })
            .catch(error => {
                console.log(error.response);
                alert("Something went wrong, please try again.");
            });
    };

   
    const getServerScripts = (id) => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(`${Links.baseLink}/scripts/byServer/${id}`, config)
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setScripts(res.data);
                }
            })
            .catch(error => {
                console.log(error.response);
                alert("يوجد عطل ما ارجو المحاولة لاحقا");
            });
    };


    const getUserDate = (id) => {
        const config = {
            headers: { Authorization: `Bearer ${new Cookie().get("userToken")}` }
        };

        axios.get(`${Links.baseLink}/users/byId/${id}`, config)
            .then(res => {
                if (res.status === 200) {
                    setUserName(res.data.name);
                    setIsDataLoading(false);
                }
            })
            .catch(error => {
                console.log(error.response);
                alert("يوجد عطل ما ارجو المحاولة لاحقا");
            });

        setShowUserPopup(true);
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
            cell: (info) => (
                <center>
                    {/* <a href={`/servers/${info.row.original.id}`}>
                        <Icon size={20} icon={ic_north_east_outline} />
                    </a> */}
                    <Link to={{ pathname: '/SingleServer', state: { id: info.row.original.id } }} >
                        <p> {info.getValue()} <Icon size={20} icon={ic_north_east_outline} /> </p>
                    </Link>
                </center>
            ),
        },
        {
            accessorKey: 'owner',
            header: 'Owner',
            cell: (info) => (
                <center>
                    <button className="btn btn-outline" onClick={() => getUserDate(info.getValue())}>
                        <Icon size={26} icon={user} />
                    </button>
                </center>
            ),
        },
        
        {
            accessorKey: 'dateCreated',
            header: 'Date Created',
            cell: (info) => <center>{moment(info.getValue()).format('YYYY/MM/DD')}</center>,
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
                        if (window.confirm('هل ترغب بحذف هذا ال server')) {
                            handelDeleteClick(info.row.original);
                        }
                    }}>
                        <div style={{ color: '#ff0000' }}>
                            <Icon size={28} icon={closeRound} />
                        </div>
                    </button>
                </center>
            ),
        },
    ], [showAdminFeatures]);

    const table = useReactTable({
        data: servers,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel() 
    });

    return (
        <>
            <div className="pagination">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
            </div>
            <table className="table">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
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
            <div className="pagination">
                <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Previous
                </button>
                <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Next
                </button>
                <span>
                    Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                </span>
            </div>

            <EditServerPopup
                show={modalShow}
                Row={Row}
                onHide={() => setModalShow(false)}
                Name={Name}
                setName={setName}
                IP={IP}
                setIP={setIP}

                Scripts={Scripts}
            />

            <UserDataPopup
                show={ShowUserPopup}
                onHide={() => setShowUserPopup(false)}
                UserName={UserName}
                IsDataLoading={IsDataLoading}
            />
        </>
    );
}
