const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_services = async (req, res) => {
  try {
    const spec_services = await pool.query("SELECT * FROM spec_service");
    res.status(200).json(spec_services.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addSpec_service = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;

    const newSpec_service = await pool.query(
      `INSERT INTO spec_service (spec_id, service_id, spec_service_price) 
      VALUES ($1,$2,$3) RETURNING *`,
      [spec_id, service_id, spec_service_price]
    );
    res.ok(200, newSpec_service.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getSpec_service = async (req, res) => {
  try {
    const spec_service = (
      await pool.query(`SELECT * FROM spec_service WHERE id=$1`, [
        req.params.id,
      ])
    ).rows;
    if (!spec_service.length)
      return res.error(400, { friendlyMsg: "spec_service topilmadi" });
    res.ok(200, spec_service);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateSpec_service = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;
    let query = "";
    query += spec_id ? `spec_id=${spec_id},` : "";
    query += service_id ? `service_id=${service_id},` : "";
    query += spec_service_price
      ? `spec_service_price=${spec_service_price},`
      : "";

    query = query.slice(0, query.length - 1);
    const spec_service = (
      await pool.query(
        `Update spec_service set ${query} WHERE id=$1 returning *`,
        [req.params.id]
      )
    ).rows;
    if (!spec_service.length)
      return res.error(400, { friendlyMsg: "spec_service topilmadi" });

    res.ok(200, spec_service);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteSpec_service = async (req, res) => {
  try {
    const spec_service = (
      await pool.query(`DELETE FROM spec_service WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!spec_service.length)
      return res.error(400, { friendlyMsg: "spec_service topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getSpec_services,
  addSpec_service,
  getSpec_service,
  updateSpec_service,
  deleteSpec_service,
};
