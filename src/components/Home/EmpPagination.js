import { faArrowLeft, faArrowRight, faBackward, faForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const EmpPagination = ({ EmployeeInfoPerPage, totalEmployee, pageChange, currentPage, LastIndexOfEmployee }) => {
    const pages = [];
    for (let i = 1; i <= Math.ceil(totalEmployee / EmployeeInfoPerPage); i++) {
        pages.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                <li className="page-item">
                    {currentPage > 1 ? <a onClick={() => pageChange(currentPage - 1)} className="page-link"><FontAwesomeIcon icon={faArrowLeft} /></a>
                        : null
                    }
                </li>

                {
                    pages.map(pageNumber => (
                        <li key={pageNumber} className="page-item">
                            <a onClick={() => pageChange(pageNumber)} className="page-link">{pageNumber}</a>
                        </li>
                    ))
                }
                <li className="page-item">
                {currentPage < pages.length ? <a onClick={() => pageChange(currentPage + 1)} className="page-link"><FontAwesomeIcon icon={faArrowRight} /></a>
                        : null
                    }
                </li>
            </ul>
        </nav>
    );
};

export default EmpPagination;