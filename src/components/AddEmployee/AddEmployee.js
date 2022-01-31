import React, { useState, useMemo } from 'react';
import NavBar from '../Home/NavBar';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

const AddEmployee = () => {
    const [singleEmployeeInfo, setSingleEmployeeInfo] = useState({
        FirstName: '',
        LastName: '',
        Email: ''
    })
    const [csvToArray, setCsvToArray] = useState([]);
    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values" });

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    const processCSV = (str, delim = ',') => {
        const headers = str.slice(0, str.indexOf('\n') - 1).split(delim);
        const rows = str.slice(str.indexOf('\n') + 1).split('\r\n')
        const newArray = rows.map(row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
        setCsvToArray(newArray);

    }
    const fileSubmitHandler = (file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const text = e.target.result;
            processCSV(text)
        }
        reader.readAsText(file);

        for (let i = 0; i <= csvToArray?.length; i++) {
            if (csvToArray[i]?.FirstName === null || csvToArray[i]?.LastName === null || csvToArray[i].Email === null) {
                const updatedArray = csvToArray.splice(i, 1)
                setCsvToArray(updatedArray);

            }
            else if (csvToArray[i]?.FirstName === undefined || csvToArray[i].LastName === undefined || csvToArray[i]?.Email === undefined) {
                const updatedArray = csvToArray.splice(i, 1)
                setCsvToArray(updatedArray);


            }
            else if (csvToArray[i]?.FastName === '' || csvToArray[i]?.LastName === '' || csvToArray[i]?.Email === '') {
                const updatedArray = csvToArray.splice(i, 1)
                setCsvToArray(updatedArray);
            }
        }

        if (csvToArray.length > 0) {
            fetch('http://localhost:8080/api/employees/addMultipleEmployee', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(csvToArray)
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'CSV File',
                            text: 'uploaded successfully!',
                        })
                        .then(function() {
                            window.location = "home";
                        });
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Ops..',
                            text: 'csv file upload unsuccessful!',
                        })
                    }
                })

        }

    }
    const textCheck = /^[a-zA-Z ]*$/;
    const emailCheck = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9 ]+\.)+[a-zA-Z ]{2,}))$/

    const handleFNameInput = (e) => {
        const FNameError = document.getElementById('FNameError');
        if (textCheck.test(e.target.value)) {
            FNameError.style.display = 'none'
            setSingleEmployeeInfo({
                ...singleEmployeeInfo,
                FirstName: e.target.value
            })

        }
        else {
            FNameError.style.color = 'red'
            FNameError.style.display = 'block'
        }
    }

    const handleLNameInput = (e) => {
        const LNameError = document.getElementById('LNameError');
        if (textCheck.test(e.target.value)) {
            LNameError.style.display = 'none'
            setSingleEmployeeInfo({
                ...singleEmployeeInfo,
                LastName: e.target.value
            })

        }
        else {
            LNameError.style.color = 'red'
            LNameError.style.display = 'block'
        }
    }

    const handleEmail = (e) => {
        const EmailError = document.getElementById('EmailError');
        if (emailCheck.test(e.target.value)) {
            EmailError.style.display = 'none'
            setSingleEmployeeInfo({
                ...singleEmployeeInfo,
                Email: e.target.value
            })

        }
        else {
            EmailError.style.color = 'red'
            EmailError.style.display = 'block'
        }
    }

    const handleSingleEmployee = (e) => {
        fetch('http://localhost:8080/api/employees/addEmployee', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(singleEmployeeInfo)
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Employee add successfully!',
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ops..',
                        text: 'employee add unsuccessfully!',
                    })
                }
            })


        e.preventDefault()
    }
    return (
        <>
            <NavBar />
            <h4 className="text-center mt-4">Employee Add Form</h4>
            <div className="container">
                <div {...getRootProps({ style })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                    <ul>
                        <li>{acceptedFiles[0]?.path}</li>
                    </ul>
                </div>
                <div className='mt-3 d-flex justify-content-center'>
                    <button onClick={() => fileSubmitHandler(acceptedFiles[0])} className="btn btn-warning text-light">
                        Upload
                    </button>
                </div>
            </div>
            <div className="border border-dark container m-auto mt-5 rounded">

                <form className="p-5" onSubmit={(e) => handleSingleEmployee(e)}>
                    <div className="form-group">
                        <label htmlFor="InputFName">First Name</label>
                        <input type="text" className="form-control" id="InputFName" onChange={(e) => handleFNameInput(e)} placeholder="First Name" required />
                        <span id='FNameError' style={{ display: 'none' }}>only letters allowed</span>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="InputLName">Last Name</label>
                        <input type="text" className="form-control" id="InputLName" onChange={(e) => handleLNameInput(e)} placeholder="Last name" required />
                        <span id='LNameError' style={{ display: 'none' }}>only letters allowed</span>
                    </div>
                    <div className="form-group mt-3">
                        <label htmlFor="InputEmail">Email address</label>
                        <input type="email" className="form-control" id="InputEmail" onChange={(e) => handleEmail(e)} placeholder="Email" required />
                        <span id='EmailError' style={{ display: 'none' }} >Enter valid email</span>
                    </div>

                    <input type="submit" value="submit" className=" mt-4 btn btn-warning text-light" />
                </form>

            </div>
        </>
    );
};

export default AddEmployee;