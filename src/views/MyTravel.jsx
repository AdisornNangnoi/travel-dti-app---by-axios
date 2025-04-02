import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Avatar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import Profile from "./../assets/profile.png";
import Place from "./../assets/travel.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function MyTravel() {
  const [traveller, setTraveller] = useState(null);
  const [travel, setTravel] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTraveller = JSON.parse(localStorage.getItem("traveller"));
    if (!storedTraveller || !storedTraveller.travellerId) {
      console.warn("Traveller ID not found! Redirecting to login...");
      navigate("/login");
      return;
    }
    setTraveller(storedTraveller);

    axios.get(`https://travel-service-server-by-prisma-iota.vercel.app/travel/${storedTraveller.travellerId}`)
      .then(response => {
        if (response.status === 200) {
          setTravel(response.data["data"]);
        }
      })
      .catch(error => console.error("Error fetching travel data:", error));
  }, [navigate]);

  const handleDeleteTravelClick = async (travelId) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?")) {
      try {
        const response = await axios.delete(`https://travel-service-server-by-prisma-iota.vercel.app/travel/${travelId}`);
        if (response.status === 200) {
          alert("ลบข้อมูลเรียบร้อยแล้ว");
          setTravel(travel.filter(t => t.travelId !== travelId));
        }
      } catch (error) {
        alert("พบข้อผิดพลาด", error);
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <FlightTakeoffIcon sx={{ color: "yellow" }} />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>บันทึกการเดินทาง</Typography>
          {traveller && (
            <>
              <Button color="inherit">{traveller.travellerFullname}</Button>
              <Avatar src={traveller.travellerImage || Profile} />
              <Link to="/" style={{ textDecoration: "none", color: "red", marginLeft: "10px" }}>LOG OUT</Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ width: "70%", mx: "auto", p: 5, my: 4 }}>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>การเดินทางของฉัน</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1E90FF" }}>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">สถานที่ไป</TableCell>
                <TableCell align="center">วันที่ไป</TableCell>
                <TableCell align="center">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {travel.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.travelPlace}</TableCell>
                  <TableCell>{row.travelStartDate}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleDeleteTravelClick(row.travelId)}>ลบ</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default MyTravel;
