import React, { useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "react-bootstrap";
import { addDetails } from "../services/allApi";

const AddStudent = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const HandleAdd = async () => {
    if (!id || !name || !course) {
      Swal.fire({
        title: "Warning",
        text: "Please fill all the fields",
        icon: "warning",
        showCloseButton: true,
      });
      return;
    }
    const reqBody = {
      name: name,
      course: course,
      id: id,
      status: "Absent",
    };
    const response = await addDetails(reqBody);
    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        title: "Success",
        text: "Details Added Successfully",
        icon: "success",
        draggable: false,
      });
      setId("");
      setName("");
      setCourse("");
    } else {
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "error",
        draggable: false,
      });
    }
  };
  const cancelData = () => {
    setId("");
    setName("");
    setCourse("");
  };

  return (
    <>
      <h2 className="text-center mt-4">Enter Student Details</h2>
      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      ></Box>

      <div className="d-flex justify-content-center align-items-center flex-column bd-highlight mb-3 mt-5">
        <div className="p-2 bd-highlight">
          <TextField
            id="outlined-basic"
            label="Enter Student Id"
            variant="outlined"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          <TextField
            id="outlined-basic"
            label="Enter Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          <TextField
            id="outlined-basic"
            label="Enter Course Name"
            variant="outlined"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
        </div>
      </div>
      <div className="d-flex justify-content-center gap-3 p-2">
        <Button variant="success" onClick={() => HandleAdd()}>
          Add
        </Button>
        <Button onClick={() => cancelData()} variant="secondary">
          Cancel
        </Button>
      </div>
    </>
  );
};

export default AddStudent;
