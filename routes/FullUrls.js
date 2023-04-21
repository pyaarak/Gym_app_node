const Router = require('express').Router();
const express = require('express')
Router.use(express.json())
const { LoginUsingJwt } = require('../Controllers/Auth');
const {ValidateToken} = require('../Controllers/AuthValidation');
const { CreateUser, UserDetails, UpdateUserDetails, UniqUserDetails, TrainerDetails, CreateWorkouts, CreateReport, CreateAttendance, ReportRemainders, AttendanceRemainders, UniqWorkoutDetails, WorkoutsUpdate, EnquiryDetails, CreateEnquiry, DeleteEnquiry, CreateAdmin } = require('../Controllers/UserDetails');


Router.post('/logindetails/login', LoginUsingJwt)
Router.post('/UserDetails',[ValidateToken,CreateUser])
Router.get('/UserDetails',[ValidateToken,UserDetails])
Router.put('/UserDetails/:id',[ValidateToken,UpdateUserDetails])
Router.get('/UserDetails/:id',[ValidateToken,UniqUserDetails])
Router.get("/TrainerDetails",[ValidateToken,TrainerDetails])
Router.post("/Workouts",[ValidateToken,CreateWorkouts])
Router.post("/Report",[ValidateToken,CreateReport])
Router.post("/Attendance",[ValidateToken,CreateAttendance])
Router.get("/Reportremainder",[ValidateToken,ReportRemainders])
Router.get("/Attendanceremainder",[ValidateToken,AttendanceRemainders])
Router.get("/workouts/:id",[ValidateToken,UniqWorkoutDetails])
Router.put("/workouts/:id",[ValidateToken,WorkoutsUpdate])
Router.get('/EnquiryDetails',[ValidateToken,EnquiryDetails])
Router.post('/EnquiryDetails',[ValidateToken,CreateEnquiry])
Router.delete('/EnquiryDetails/:id',[ValidateToken,DeleteEnquiry])
Router.post("/admincreate",[CreateAdmin])

module.exports = Router;
