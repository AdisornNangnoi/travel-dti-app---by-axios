import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import React, { useEffect, useState } from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Profile from "./../assets/profile.png";
import Place from "./../assets/travel.png";
import { Link } from "react-router-dom";
import { Try } from "@mui/icons-material";

function MyTravel() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travel, setTravel] = useState([]);

  useEffect(() => {
    const handleStorageChange = () => {
      const traveller = JSON.parse(localStorage.getItem("traveller")) || {};
      setTravellerFullname(traveller.travellerFullname || "");
      setTravellerImage(traveller.travellerImage || "");
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange(); // โหลดข้อมูลครั้งแรก

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // ทำงานแค่ครั้งแรกเท่านั้น

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller")) || {};
    setTravellerFullname(traveller.travellerFullname || "");
    setTravellerImage(traveller.travellerImage || "");

    //ดึงขข้อมูลมาแสดง
    const getAllTravel = async () => {
      const resData = await fetch(
        `http://localhost:4000/travel/${traveller.travellerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (resData.status == 200) {
        const data = await resData.json();
        setTravel(data["data"]);
      }
    };
    getAllTravel();
  }, []); // ทำงานแค่ครั้งแรกและเมื่อข้อมูลใน localStorage เปลี่ยนแปลง

  const handleDeleteTravelClick = async (travelId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/travel/${travelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("ลบข้อมูลเรียบร้อยแล้ว");
        window.location.href = "/mytravel";
      }else{
        alert("ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
      }
    } catch (error) {
      alert("พบข้อผิดพลาด", error);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <FlightTakeoffIcon sx={{ color: "yellow" }} />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                บันทึกการเดินทาง
              </Typography>
              <Link
                to="/editprofile"
                style={{
                  textDecoration: "none",
                  color: "white",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                <Button color="inherit">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travellerImage === ""
                    ? Profile
                    : `http://localhost:4000/images/traveller/${travellerImage}`
                }
              />
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "red",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ width: "70%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ textAlign: "center", mb: 4 }}
          >
            การเดินทางของฉัน
          </Typography>
          <TableContainer component={Paper} sx={{ mx: "auto" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#1E90FF" }}>
                  <TableCell align="center">No.</TableCell>
                  <TableCell align="center">สถานที่ไป</TableCell>
                  <TableCell align="center">รูป</TableCell>
                  <TableCell align="center">วันที่ไป</TableCell>
                  <TableCell align="center">วันที่กลับ</TableCell>
                  <TableCell align="center">ค่าใช้จ่ายทั้งหมด</TableCell>
                  <TableCell align="center">#</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {travel.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      backgroundColor:
                        (index + 1) % 2 == 0 ? "#ffffff" : "#e3f2fd",
                    }}
                  >
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">{row.travelPlace}</TableCell>
                    <TableCell align="center">
                      {
                        <Avatar
                          src={
                            row.travelImage == ""
                              ? Place
                              : `http://localhost:4000/images/travel/${row.travelImage}`
                          }
                          sx={{ width: 60, height: 60, boxShadow: 3 }}
                          variant="rounded"
                        />
                      }
                    </TableCell>
                    <TableCell align="left">{row.travelStartDate}</TableCell>
                    <TableCell align="left">{row.travelEndDate}</TableCell>
                    <TableCell align="right">{row.travelCostTotal}</TableCell>
                    <TableCell align="center">
                      <Button component={Link} to={`/editmytravel/${row.travelId}`}>แก้ไข</Button>
                      <Button onClick={() => handleDeleteTravelClick(row.travelId)}>ลบ</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link
            to="/addmytravel"
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              fullWidth
              variant="contained"
              sx={{ py: 2, mt: 4, mx: "auto" }}
            >
              เพิ่มการเดินทาง
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default MyTravel;
