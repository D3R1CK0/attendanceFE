import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  deleteStudent,
  getDetails,
  updateAttendance,
} from "../services/AllApi";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Student name", width: 130 },
    { field: "course", headerName: "Course name", width: 130 },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 160,
      renderCell: (params) => (
        <Button
          variant={params.row.status === "Present" ? "success" : "danger"}
          onClick={() => handleAttendance(params.row)}
        >
          {params.row.status}
        </Button>
      ),
    },
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button variant="danger" onClick={() => handleDelete(params.row.id)}>
          Delete
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };
  useEffect(() => {
    const getData = async () => {
      const response = await getDetails();
      if (response.status == 200) {
        setRows(response.data);
      } else {
        Swal.fire("Error", "Error Fetching Data", "error");
      }
    };
    getData();
  }, []);
  const handleAttendance = async (student) => {
    const newStatus = student.status === "Present" ? "Absent" : "Present";
    const updateStudent = { ...student, status: newStatus };

    const response = await updateAttendance(student.id, updateStudent);
    if (response.status == 200) {
      Swal.fire("Success", "Attendance Marked", "success");
      getData();
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
    });

    if (confirmDelete.isConfirmed) {
      const response = await deleteStudent(id);
      if (response.status == 200) {
        Swal.fire("Deleted!", "Student record has been deleted", "success");
        getData();
      } else {
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };
  return (
    <div>
      <h1 className="text-center">Attendance Manager</h1>
      <div className="d-flex justify-content-end mt-4 me-4">
        <Button variant="success" as={Link} to="/addstudent">
          <FaPlus />
          Add Student
        </Button>
      </div>
      <Paper sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};

export default Home;
