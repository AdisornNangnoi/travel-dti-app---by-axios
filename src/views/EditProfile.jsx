import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useEffect, useState } from "react";
import Profile from "./../assets/profile.png";
import { Link, useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Travel from "./../assets/travel.png";
import axios from "axios";

function EditProfile() {
  const [travellerFullname, setTravellerFullname] = useState("");
  const [travellerImage, setTravellerImage] = useState("");
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");
  const [travellerId, setTravellerId] = useState("");

  const [travellerNewImage, setTravellerNewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const traveller = JSON.parse(localStorage.getItem("traveller")) || {};

    setTravellerId(traveller.travellerId);
    setTravellerFullname(traveller.travellerFullname);
    setTravellerImage(traveller.travellerImage);
    setTravellerEmail(traveller.travellerEmail);
    setTravellerPassword(traveller.travellerPassword);
  }, []);

  const handleSelectFileClick = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTravellerNewImage(file);
    }
  };

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

  const handleEditProfileClick = async (e) => {
    e.preventDefault();

    if (travellerFullname.trim().length === 0) {
      alert("ป้อนชื่อ-นามสกุลด้วย");
      return;
    }
    if (travellerEmail.trim().length === 0) {
      alert("ป้อนอีเมล์ด้วย");
      return;
    }
    if (travellerPassword.trim().length === 0) {
      alert("ป้อนรหัสผ่านด้วย");
      return;
    }

    const formData = new FormData();
    formData.append("travellerId", travellerId);
    formData.append("travellerImage", travellerNewImage);
    formData.append("travellerFullname", travellerFullname);
    formData.append("travellerEmail", travellerEmail);
    formData.append("travellerPassword", travellerPassword);

    try {
      // const response = await fetch(
      //   `https://travel-service-server-by-prisma-iota.vercel.app/traveller/${travellerId}`,
      //   {
      //     method: "PUT",
      //     body: formData,
      //   }
      // );
      const response = await axios.put(
        `https://travel-service-server-by-prisma-iota.vercel.app/traveller/${travellerId}`,
        formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      if (response.status == 200) {
        alert("แก้ไขข้อมูลเรียบร้อยแล้ว");
        // const data = await response.json();
        // localStorage.setItem("traveller", JSON.stringify(data["data"]));
        localStorage.setItem("traveller", JSON.stringify(response.data["data"]));
        navigate("/mytravel");
      }
    } catch (error) {
      alert("พบข้อผิดพลาด: " + error.message);
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
              <Link to={"/editprofile"} style={{ color: "white" }}>
                <Button color="inherit">{travellerFullname}</Button>
              </Link>
              <Avatar
                src={
                  travellerImage
                    ? `${travellerImage}`
                    : Profile
                }
              />
              <Link
                to={"/"}
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: "10px",
                  fontWeight: "bold",
                }}
              >
                LOG OUT
              </Link>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", p: 5, my: 4 }}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Travel DTI
          </Typography>
          <Avatar
            src={Travel}
            alt="travel logo"
            sx={{ width: 150, height: 150, mx: "auto", my: 2 }}
          />
          <Typography
            variant="h5"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            แก้ไขโปรไฟล์
          </Typography>
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อ-นามสกุล
          </Typography>
          <TextField
            fullWidth
            value={travellerFullname}
            onChange={(e) => setTravellerFullname(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
            ชื่อผู้ใช้ (E-Mail)
          </Typography>
          <TextField
            fullWidth
            value={travellerEmail}
            onChange={(e) => setTravellerEmail(e.target.value)}
          />
          <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
            รหัสผ่าน
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={travellerPassword}
            onChange={(e) => setTravellerPassword(e.target.value)}
          />

          <Avatar
            src={
              travellerNewImage
                ? URL.createObjectURL(travellerNewImage)
                : `${travellerImage}`
            }
            alt="profile"
            sx={{ width: 150, height: 150, mx: "auto", my: 3 }}
            variant="rounded"
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              เลือกรูป
              <SelectFileBt
                type="file"
                accept="image/*"
                onChange={handleSelectFileClick}
              />
            </Button>
          </Box>

          <Button
            onClick={handleEditProfileClick}
            variant="contained"
            fullWidth
            sx={{ mt: 4, py: 2, backgroundColor: "#259e69" }}
          >
            แก้ไข Profile
          </Button>

          <Link
            to="/mytravel"
            style={{ textDecoration: "none", color: "#259e69" }}
          >
            <Typography
              sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
            >
              กลับไปหน้า การเดินทางของฉัน
            </Typography>
          </Link>
        </Box>
      </Box>
    </>
  );
}

export default EditProfile;
