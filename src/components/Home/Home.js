import React, { useEffect, useState, useRef } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import NavBar from './NavBar';
import EmpPagination from './EmpPagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Home = () => {

    const [employee, setEmployee] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/employees/getAllEmployees')
            .then(response => response.json())
            .then(data => setEmployee(data))
    }, [employee]);

    const [currentPage, setCurrentPage] = useState(1);
    const [EmployeeInfoPerPage, setEmployeeInfoPerPage] = useState(5);
    let i = 1;

    const LastIndexOfEmployee = (currentPage * EmployeeInfoPerPage);
    const FirstIndexOfEmployee = (LastIndexOfEmployee - EmployeeInfoPerPage);
    const currentEmployee = employee.slice(FirstIndexOfEmployee, LastIndexOfEmployee)

    const handleSelectEmployee = (emp) => {
        const emailBtn = document.getElementById('sendEmailBtn');
        emailBtn.style.display = 'block';
        selectedEmployee.push(emp)
    }

    const handleSelectPerPageInfo = (e) => {
        setEmployeeInfoPerPage(e.target.value)
    }
    const pageChange = (pageNumber) => setCurrentPage(pageNumber);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_z4a3128', e.target, 'user_89jN937aRdcsCQdOHof7D')
            .then((result) => {
                console.log(result)
                if(result){
                    setShow(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'Email',
                        text: 'send successfully!',
                    })
                }
            }, (error) => {
                console.log(error)
                if(error){
                    setShow(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Email',
                        text: 'send unsuccessfully!',
                    })
                }
            });
    };

    return (
        <>
            <NavBar />
            <div className='container my-5'>
                <h4 className="mb-4">Employee's Information</h4>
                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <select className="form-select" onChange={(e) => handleSelectPerPageInfo(e)}>
                            <option value="5">5 per page</option>
                            <option value="10">10 per page</option>
                            <option value="20">20 per page</option>
                            <option value="50">50 per page</option>
                        </select>
                    </div>
                    <div>
                        <input className="form-control" type="text" placeholder='search ...'></input>
                    </div>
                </div>
                <Table bordered hover responsive>
                    <thead className="bg-dark">
                        <tr className="text-light">
                            <th>#</th>
                            <th>Select</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentEmployee.map((emp, index) =>
                                <tr key={index}>
                                    <td>{i++}</td>
                                    <td><input onClick={() => handleSelectEmployee(emp.Email)} type="checkbox" name="name1" />&nbsp;</td>
                                    <td>{emp.FirstName}</td>
                                    <td>{emp.LastName}</td>
                                    <td>{emp.Email}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
                <div className="d-flex justify-content-between mb-3">
                    <div><EmpPagination
                        EmployeeInfoPerPage={EmployeeInfoPerPage}
                        totalEmployee={employee.length}
                        pageChange={pageChange}
                        currentPage={currentPage}
                        LastIndexOfEmployee={LastIndexOfEmployee}
                    /></div>
                    <div>
                        <Button id='sendEmailBtn' variant="primary" className="btn btn-info text-light" style={{ display: 'none' }} onClick={handleShow}>
                            Send <FontAwesomeIcon icon={faEnvelope} />
                        </Button>
                    </div>
                </div>

            </div>



            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    {selectedEmployee.map((select, index) => <p key={index} className="form-control">{select}</p>)}
                   
                    <form ref={form} onSubmit={sendEmail}>
                    <input className="form-control my-3" placeholder="subject" name='subject' />
                    <textarea rows="6" className="form-control my-3" placeholder='body' name='message'/>
                    <input className="btn btn-info" type="submit" value="Send" />
                    </form>
                </Modal.Body>
            </Modal>

        </>
    );
};

export default Home;