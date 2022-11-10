const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_working_days = async (req, res) => {
  try {
    const spec_working_days = await pool.query(
      "SELECT * FROM spec_working_day"
    );
    res.status(200).json(spec_working_days.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addSpec_working_day = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      res_start_time,
      res_finish_time,
    } = req.body;

    const newSpec_working_day = await pool.query(
      `INSERT INTO spec_working_day (spec_id, day_of_week, start_time,finish_time,res_start_time,res_finish_time) 
      VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        res_start_time,
        res_finish_time,
      ]
    );
    res.ok(200, newSpec_working_day.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getSpec_working_day = async (req, res) => {
  try {
    const spec_working_day = (
      await pool.query(`SELECT * FROM spec_working_day WHERE id=$1`, [
        req.params.id,
      ])
    ).rows;
    if (!spec_working_day.length)
      return res.error(400, { friendlyMsg: "spec_working_day topilmadi" });
    res.ok(200, spec_working_day);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateSpec_working_day = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      res_start_time,
      res_finish_time,
    } = req.body;
    let query = "";
    query += spec_id ? `spec_id=${spec_id},` : "";
    query += day_of_week ? `day_of_week=${day_of_week},` : "";
    query += start_time ? `start_time= '${start_time}',` : "";
    query += finish_time ? `finish_time= '${finish_time}',` : "";
    query += res_start_time ? `res_start_time= '${res_start_time}',` : "";
    query += res_finish_time ? `res_finish_time= '${res_finish_time}',` : "";

    query = query.slice(0, query.length - 1);
    const spec_working_day = (
      await pool.query(
        `Update spec_working_day set ${query} WHERE id=$1 returning *`,
        [req.params.id]
      )
    ).rows;
    if (!spec_working_day.length)
      return res.error(400, { friendlyMsg: "spec_working_day topilmadi" });

    res.ok(200, spec_working_day);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteSpec_working_day = async (req, res) => {
  try {
    const spec_working_day = (
      await pool.query(`DELETE FROM spec_working_day WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!spec_working_day.length)
      return res.error(400, { friendlyMsg: "spec_working_day topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getSpec_working_days,
  addSpec_working_day,
  getSpec_working_day,
  updateSpec_working_day,
  deleteSpec_working_day,
};
