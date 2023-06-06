const modelDiary = {
    queryGetPatient: "SELECT p.*, e.date, e.hour, e.state FROM patient p INNER JOIN eventday e ON p.IDeventday = e.IDd",
    queryAddUser: `INSERT INTO users (name, surname, email, user, password, token, state) VALUES ( ?, ?, ?, ?, ?, ?, 1)`,
    queryUserExists: `SELECT * FROM users WHERE user = ? AND password = ?`,
    queryPatientExists: `SELECT name, surname FROM patient WHERE name = ? AND surname = ?`,
    queryEventdayExists: `SELECT IDd FROM eventday WHERE date = ? AND hour = ?`,
    queryAddEventday: `INSERT INTO eventday (date, hour, state) VALUES ( ?, ?, 'reserved')`,
    queryAddPatient: `INSERT INTO patient (name, surname, gender, birth, email, phonenumber, direction, IDeventday) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    queryGetCountPatient: `Select count(*) as count from patient`,
    queryGetCountUser: `Select count(*) as count from users`,
    querySignIn: `SELECT token, password, state FROM users WHERE user = ?`,
    queryGetTime: `SELECT hour, state FROM eventday`,
}
module.exports = modelDiary