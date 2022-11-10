const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getServices = async (req, res) => {
  try {
    const services = await pool.query("SELECT * FROM service");
    res.status(200).json(services.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    console.log(req.body);

    const newService = await pool.query(
      `INSERT INTO service (service_name, service_price) 
      VALUES ($1,$2) RETURNING *`,
      [service_name, service_price]
    );
    res.ok(200, newService.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getService = async (req, res) => {
  try {
    const service = (
      await pool.query(`SELECT * FROM service WHERE id=$1`, [req.params.id])
    ).rows;
    if (!service.length)
      return res.error(400, { friendlyMsg: "service topilmadi" });
    res.ok(200, service);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    let query = "";
    query += service_name ? `service_name='${service_name}',` : "";
    query += service_price ? `service_price='${service_price}',` : "";
    query = query.slice(0, query.length - 1);
    console.log(query);
    const service = (
      await pool.query(`Update service set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!service.length)
    return res.error(400, { friendlyMsg: "service topilmadi" });
    res.ok(200, service);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteService = async (req, res) => {
  try {
    const service = (
      await pool.query(`DELETE FROM service WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!service.length)
      return res.error(400, { friendlyMsg: "service topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getServices,
  addService,
  getService,
  updateService,
  deleteService,
};
