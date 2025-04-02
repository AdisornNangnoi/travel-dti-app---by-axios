import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  TextField,
  styled,
} from "@mui/material";
import React from "react";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import Profile from "./../assets/profile.png";
import { Link } from "react-router-dom";
import Travel from "./../assets/travel.png";
import axios from "axios";

function AddMyTravel() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");

  const [travelImage, setTravelImage] = useState("");
  const [travelPlace, setTravelPlace] = useState("");
  const [travelCostTotal, setTravelCostTotal] = useState("");
  const [travelStartDate, setTravelStartDate] = useState("");
  const [travelEndDate, seTtravelEndDate] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravelImage(file);
    }
  };
  //select image func
  const SelectFileBt = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleSaveTravelClick = async (e) => {
    e.preventDefault();
    if (travelPlace.trim().length == 0) {
      alert("ป้อนสถานที่ด้วย");
    } else if (travelStartDate.trim().length == 0) {
      alert("ป้อนวันที่ไปด้วย");
    } else if (travelEndDate.trim().length == 0) {
      alert("ป้อนวันที่กลับด้วย");
    } else if (travelCostTotal.trim().length == 0) {
      alert("ป้อนค่าใช้จ่ายด้วย");
    } else {
      //ส่งข้อมูลไปให้ API บันทึงลง DB แล้ว redirect ไปหน้า Login
      const formData = new FormData();

      formData.append("travelPlace", travelPlace);
      formData.append("travelCostTotal", travelCostTotal);
      formData.append("travelStartDate", travelStartDate);
      formData.append("travelEndDate", travelEndDate);
      formData.append("travellerId", travellerId);

      if (travelImage) {
        formData.append("travelImage", travelImage);
      }
      //ส่งข้อมูลไปให้ API (https://localhost:4000/traveller/) บันทึงลง DB
      try {
        // const response = await fetch("https://travel-service-server-by-prisma-iota.vercel.app//travel/", {
        //   method: "POST",
        //   body: formData,
        // });
        const response = await axios.post("https://travel-service-server-by-prisma-iota.vercel.app//travel/", formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status == 201) {
          alert("บันทึกการเดินทางสําเร็จ");
          window.location.href = "/mytravel";
        } else {
          alert("บันทึกการเดินทางไม่สําเร็จ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        alert("พบข้อผิดพลาด", error);
      }
    }
  };

  useEffect(() => {
    //เอาข้อมูลใน memory มาแสดงที่ Appbar
    const traveller = JSON.parse(localStorage.getItem("traveller"));
    //เอาข้อมูลในตัวแปรมากำหนดให้ตัวแปรใน useState
    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerId(traveller.travellerId);
  }, []);
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
                  travellerImage == ""
                    ? Profile
                    : `${travellerImage}`
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
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Travel DTI
          </Typography>
          {/* Logo image =====================================*/}
          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>
          {/* Add text =====================================*/}
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            เพิ่มการเดินทาง
          </Typography>

          {/* TextField Place  =====================================*/}
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            สถานที่ที่เดินทางไป
          </Typography>
          <TextField
            fullWidth
            value={travelPlace}
            onChange={(e) => setTravelPlace(e.target.value)}
          />

          {/* TextField DateStart  =====================================*/}
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            วันที่เดินทางไป
          </Typography>

          <TextField
            fullWidth
            value={travelStartDate}
            onChange={(e) => setTravelStartDate(e.target.value)}
          />

          {/* TextField DateEnd  =====================================*/}
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            วันที่เดินทางกลับ
          </Typography>
          <TextField
            fullWidth
            value={travelEndDate}
            onChange={(e) => seTtravelEndDate(e.target.value)}
          />

          {/* TextField Cost  =====================================*/}
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ต่าใช้จ่ายในการเดินทาง
          </Typography>
          <TextField
            fullWidth
            type="number"
            value={travelCostTotal}
            onChange={(e) => setTravelCostTotal(e.target.value)}
          />

          {/* Profile Image =====================================*/}
          {/* <Avatar
          src={
            travelImage == null
              ? Profile
              : URL.createObjectURL(travelImage)
          }
          alt="travel logo"
          sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
        ></Avatar> */}
          <Avatar
            src={
              travelImage && travelImage instanceof Blob
                ? URL.createObjectURL(travelImage)
                : Travel
            }
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 5 }}
          ></Avatar>

          {/* btSelectFile   =====================================*/}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ mx: "auto" }}
              component="label"
            >
              อัปโหลดรูปภาพโปรไฟล์
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>
          {/* btRegister   =====================================*/}
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
            onClick={handleSaveTravelClick}
          >
            บันทึกการเดินทาง
          </Button>
          <Link
            to="/mytravel"
            style={{ textDecoration: "none", color: "#259e69" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้าการเดินทางของฉัน
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default AddMyTravel;
