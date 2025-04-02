import React from "react";
import { Box, Typography, Avatar, TextField, Button } from "@mui/material";
import Travel from "./../assets/travel.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [travellerEmail, setTravellerEmail] = useState("");
  const [travellerPassword, setTravellerPassword] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = async (e) => {
    e.preventDefault();
    if (!travellerEmail.trim() || !travellerPassword.trim()) {
      alert("โปรดป้อนอีเมล์และรหัสผ่าน");
      return;
    }

    try {
      const response = await axios.get(
        `https://travel-service-server-by-prisma-iota.vercel.app/traveller/${encodeURIComponent(travellerEmail)}/${encodeURIComponent(travellerPassword)}`
      );

      if (response.status === 200 && response.data && response.data.travellerId) {
        localStorage.setItem("traveller", JSON.stringify(response.data));
        console.log("Saved to Local Storage:", response.data);
        navigate("/mytravel");
      } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่");
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "60%", boxShadow: 4, mx: "auto", my: "auto", p: 5 }}>
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>
          Travel DTI
        </Typography>

        <Avatar src={Travel} alt="travel logo" sx={{ width: 150, height: 150, mx: "auto", my: 5 }} />
        <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "bold" }}>เข้าใช้งานระบบ</Typography>

        <TextField fullWidth label="อีเมล์" value={travellerEmail} onChange={(e) => setTravellerEmail(e.target.value)} />
        <TextField fullWidth type="password" label="รหัสผ่าน" value={travellerPassword} onChange={(e) => setTravellerPassword(e.target.value)} sx={{ mt: 2 }} />

        <Button variant="contained" fullWidth onClick={handleLoginClick} sx={{ mt: 2, py: 2, backgroundColor: "#259e69" }}>
          LOGIN
        </Button>

        <Link to="/register" style={{ textDecoration: "none", color: "#259e69" }}>
          <Typography sx={{ fontWeight: "bold", mt: 2, textAlign: "center" }}>ลงทะเบียน</Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default Login;