import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material"; //material ui
import Travel from "./../assets/travel.png"; //Logo image
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [travellerEmail, setTravellerEmail] = useState();
  const [travellerPassword, setTravellerPassword] = useState();
  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (travellerEmail.length == 0) {
      alert("ป้อนอีเมล์ด้วย");
      return;
    } else if (travellerPassword.length == 0) {
      alert("ป้อนรหัสผ่านด้วย");
      return;
    }
    try {
      // const response = await fetch(
      //   `travel-service-server-by-prisma-iota.vercel.app/traveller/${travellerEmail}/${travellerPassword}`,
      //   {
      //     method: "GET",
      //   }
      // );
      const response = await axios.get(
        `travel-service-server-by-prisma-iota.vercel.app/traveller/${travellerEmail}/${travellerPassword}`
      );

      if (response.status == 200) {
        // const data = await response.json();
        // localStorage.setItem("traveller", JSON.stringify(data["data"]));
        // window.location.href = "/mytravel";

        localStorage.setItem(
          "traveller",
          JSON.stringify(response.data["data"])
        );
        window.location.href = "/mytravel";
      } else if (response.status === 404) {
        alert("ชื่อผู้ใช้รหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      alert("พบข้อผิดพลาด", error);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", my: "auto", p: 5 }}>
        {/* Head text =====================================*/}
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
        {/* Login text =====================================*/}
        <Typography
          variant="h5"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          เข้าใช้งานระบบ
        </Typography>

        <Typography sx={{ fontWeight: "bold", mt: 4, mb: 1 }}>
          ชื่อผู้ใช้
        </Typography>
        {/* TextField Username  =====================================*/}
        <TextField
          fullWidth
          value={travellerEmail}
          onChange={(e) => setTravellerEmail(e.target.value)}
        />

        <Typography sx={{ fontWeight: "bold", mt: 2, mb: 1 }}>
          รหัสผ่าน
        </Typography>

        {/* TextField passwords  =====================================*/}
        <TextField
          fullWidth
          type="password"
          value={travellerPassword}
          onChange={(e) => setTravellerPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLoginClick}
          sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}
        >
          LOGIN
        </Button>

        {/* Link to Resgister Page */}
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "#259e69" }}
        >
          <Typography
            sx={{ fontWeight: "bold", mt: 2, mb: 1, textAlign: "center" }}
          >
            ลงทะเบียน
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;
