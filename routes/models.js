const router = require('express').Router();
const db = require('../Config/dbconfig');
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;

const Fulldetails={
    Users:db.define('User_details',{id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, name: { type: DataTypes.STRING }, email: { type: DataTypes.STRING }, contact: { type: DataTypes.STRING }, gender: { type: DataTypes.STRING }, package: { type: DataTypes.STRING }, expirydate: { type: DataTypes.STRING }, weight:{type:DataTypes.STRING} ,status: {type:DataTypes.STRING}}),
    Report:db.define('Report',{id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}, report_document: {type:DataTypes.STRING},attendance_document:{type:DataTypes.STRING},reportdate:{type:DataTypes.STRING},attendancedate:{type:DataTypes.STRING},reportcycle:{type:DataTypes.STRING},attandancecycle:{type:DataTypes.STRING},reportremaider:{type:DataTypes.STRING},attendanceremainder:{type:DataTypes.STRING},status:{type:DataTypes.STRING},weight:{type:DataTypes.STRING}}),
    workouts:db.define('workouts',{id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true}, Date:{type:DataTypes.STRING}, Day:{type:DataTypes.STRING}, musclegroup:{type:DataTypes.STRING},trainername:{type:DataTypes.STRING}}),
    LoginDetails:db.define('LoginDetails',{id:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},email:{type:DataTypes.STRING},password:{type:DataTypes.STRING},role:{type:DataTypes.STRING}}),
    Enquiry:db.define('Enquiry_details',{id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, name: { type: DataTypes.STRING }, email: { type: DataTypes.STRING }, contact: { type: DataTypes.STRING }, gender: { type: DataTypes.STRING }, status: {type:DataTypes.STRING},bmi_value:{type:DataTypes.STRING},bmi_state:{type:DataTypes.STRING},height:{type:DataTypes.STRING},weight:{type:DataTypes.STRING},age:{type:DataTypes.STRING},fat_percentage:{type:DataTypes.STRING},fat_state:{type:DataTypes.STRING},body_type:{type:DataTypes.STRING},gaol_type:{type:DataTypes.STRING}}),
}

Fulldetails.Users.hasMany(Fulldetails.Report, { foreignKey: 'User_id',foreignKeyConstraint:true,type:DataTypes.STRING})
Fulldetails.Users.hasMany(Fulldetails.workouts, {foreignKey: 'User_id',foreignKeyConstraint:true,type:DataTypes.STRING})
Fulldetails.Report.belongsTo(Fulldetails.Users, {foreignKey: "User_id",foreignKeyConstraint:true,type:DataTypes.STRING})
Fulldetails.workouts.belongsTo(Fulldetails.Users, {foreignKey: "User_id",foreignKeyConstraint:true,type:DataTypes.STRING})

module.exports=Fulldetails

// db.sync()