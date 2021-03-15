import React from 'react'

export default function Pagination({ userPerPage, totalUser, paginate}) {

    const pageNumbers = [];
    for (let index = 1; index <= Math.ceil(totalUser / userPerPage); index++) {
        pageNumbers.push(index);
    }
    // console.log(pageNumbers);
    return (

        <nav >
            <ul className="pagination">
                {pageNumbers.slice(0,12).map((number, index) => {
                    return <>
                        <li key={index} className="page-item">
                            <span onClick={() => paginate(number)} className="page-link" style={{ cursor: 'pointer' }}>
                                {number}
                            </span>
                        </li>
                    </>
                })}
            </ul>
        </nav>
    )
}
