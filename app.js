import express from "express";

import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import { mockAuth } from "./middlewares/mockAuth.js";

const app = express()

app.use(express.json());

app.use(mockAuth); // Apply mock authentication middleware

app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/patients', patientRoutes);

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Doctor Booking API</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #5a2828ff, #62b9e4ff);
            color: #333;
            padding: 50px;
            text-align: center;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 10px;
          }
          p {
            font-size: 18px;
            margin-bottom: 30px;
          }
          .routes {
            text-align: left;
            display: inline-block;
            background: linear-gradient(to left, #5a2828ff, #62b9e4ff);
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          code {
            background-color: #d5dfcbff;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 16px;
          }
          h2 {
            color: #fff;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Doctor Booking API</h1>
        <p>This is a simple REST API for managing doctors, patients, and their appointments.</p>

        <div class="routes">
          <h2>📘 Doctor Routes:</h2>
          <ul>
            <li><code>GET /doctors</code> – List all doctors</li>
            <li><code>GET /doctors/:id</code> – Get doctor details</li>
            <li><code>POST /doctors</code> – Add a new doctor</li>
            <li><code>PUT /doctors/:id</code> – Update doctor info</li>
            <li><code>DELETE /doctors/:id</code> – Delete a doctor</li>
          </ul>

          <h2>🧑‍⚕️ Patient Routes:</h2>
          <ul>
            <li><code>GET /patients</code> – List all patients</li>
            <li><code>GET /patients/:id</code> – Get patient details</li>
            <li><code>POST /patients</code> – Add a new patient</li>
            <li><code>PUT /patients/:id</code> – Update patient info</li>
            <li><code>DELETE /patients/:id</code> – Delete a patient</li>
          </ul>

          <h2>📅 Appointment Routes:</h2>
          <ul>
            <li><code>GET /appointments</code> – List all appointments</li>
            <li><code>GET /appointments?doctor=doctorId</code> – Appointments for a doctor</li>
            <li><code>GET /appointments?patient=patientId</code> – Appointments for a patient</li>
            <li><code>POST /appointments</code> – Book a new appointment</li>
            <li><code>PUT /appointments/:id</code> – Update appointment</li>
            <li><code>DELETE /appointments/:id</code> – Cancel appointment</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});



export default app;

