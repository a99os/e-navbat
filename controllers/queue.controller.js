const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getQueues = async (req, res) => {
  try {
    const queues = await pool.query("SELECT * FROM queue");
    res.status(200).json(queues.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addQueue = async (req, res) => {
  try {
    const { client_id, spec_service_id, queue_date_time, queue_number } =
      req.body;
    console.log(req.body);

    const newQueue = await pool.query(
      `INSERT INTO queue (client_id, spec_service_id, queue_date_time, queue_number) 
      VALUES ($1,$2,$3,$4) RETURNING *`,
      [client_id, spec_service_id, queue_date_time, queue_number]
    );
    res.ok(200, newQueue.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getQueue = async (req, res) => {
  try {
    const queue = (
      await pool.query(`SELECT * FROM queue WHERE id=$1`, [req.params.id])
    ).rows;
    if (!queue.length)
      return res.error(400, { friendlyMsg: "queue topilmadi" });
    res.ok(200, queue);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateQueue = async (req, res) => {
  try {
    const { client_id, spec_service_id, queue_date_time, queue_number } =
      req.body;
    let query = "";
    query += client_id ? `client_id=${client_id},` : "";
    query += spec_service_id ? `spec_service_id=${spec_service_id},` : "";
    query += queue_date_time ? `queue_date_time='${queue_date_time}',` : "";
    query += queue_number ? `queue_number='${queue_number}',` : "";
    query = query.slice(0, query.length - 1);
    const queue = (
      await pool.query(`Update queue set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!queue.length)
      return res.error(400, { friendlyMsg: "queue topilmadi" });
    res.ok(200, queue);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteQueue = async (req, res) => {
  try {
    const queue = (
      await pool.query(`DELETE FROM queue WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!queue.length)
      return res.error(400, { friendlyMsg: "queue topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getQueues,
  addQueue,
  getQueue,
  updateQueue,
  deleteQueue,
};
