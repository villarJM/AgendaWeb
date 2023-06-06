const {Router} = require("express")
const {signIn, addPatient, getPatient, addUser, getTime, getUsers, getCountRegiterPatient, getCountRegiterUser} = require("../controllers/agenda")
const router = Router()

//http://localhost:4000/api/v1/agenda

  router.post("/signin", signIn);
  router.post("/appoinment/addusers", addUser)
  router.post("/appoinment/addpatient", addPatient);
  router.get("/appoinment/getpatient", getPatient)
  router.get("/appoinment/gettime", getTime)
  router.get("/appoinment/getusers", getUsers)
  router.get("/appoinment/getcountpatient", getCountRegiterPatient)
  router.get("/appoinment/getcountuser", getCountRegiterUser)

module.exports = router
