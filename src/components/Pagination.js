import React from 'react'
import { Form } from "react-bootstrap";

export default function Pagination({ itemsPerPage, totalItems, paginate, currentPage, setItemsPerPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                <nav dir="rtl">
                    <ul className='pagination'>
                    <p className="px-3 mt-1"> الصفحة:</p>
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                <a onClick={() => paginate(number)} className={
                                    number === currentPage? 'page-link selected-page':
                                        'page-link'
                                    }>
                                    {number}
                                </a>
                                
                            </li>
                        ))}
                        <p className="px-3 mt-1"> عدد نتائج البحث:</p>
                        <Form.Group  >
                            <Form.Select defaultValue={itemsPerPage} dir="ltr"
                                onChange={(e) => setItemsPerPage(e.target.value)}>
                                <option value="6">6</option>
                                <option value="12">12</option>
                                <option value="24">24</option>
                                <option value="48">48</option>
                                <option value="96">96</option>
                            </Form.Select>
                        </Form.Group>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
    )
}
