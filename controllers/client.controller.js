const pool = require("../config/db");
const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");

const getClients = async (req, res) => {
  try {
    const clients = await pool.query("SELECT * FROM client");
    res.status(200).json(clients.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addClient = async (req, res) => {
  try {
    const {
      client_first_name,
      client_last_name,
      client_phone_number,
      client_password,
      client_info,
      client_photo,
      client_is_active,
      otp_id,
    } = req.body;

    if (
      (
        await pool.query(`SELECT * FROM client WHERE client_phone_number=$1`, [
          client_phone_number,
        ])
      ).rows.length
    )
      return res.error(400, { friendlyMsg: "Bunday telefon raqam mavjud" });

    const newClient = await pool.query(
      `INSERT INTO client (client_first_name, client_last_name, client_phone_number, client_password, client_info,client_photo, client_is_active,otp_id) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        client_first_name,
        client_last_name,
        client_phone_number,
        bcrypt.hashSync(client_password, 7),
        client_info,
        client_photo,
        client_is_active,
        otp_id,
      ]
    );
    res.ok(200, newClient.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getClient = async (req, res) => {
  try {
    const client = (
      await pool.query(`SELECT * FROM client WHERE id=$1`, [req.params.id])
    ).rows;
    if (!client.length)
      return res.error(400, { friendlyMsg: "client topilmadi" });
    res.ok(200, client);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateClient = async (req, res) => {
  try {
    const {
      client_first_name,
      client_last_name,
      client_phone_number,
      client_password,
      client_info,
      client_photo,
      client_is_active,
      otp_id,
    } = req.body;
    let query = "";
    query += client_first_name
      ? `client_first_name='${client_first_name}',`
      : "";
    query += client_last_name ? `client_last_name='${client_last_name}',` : "";
    query += client_phone_number
      ? `client_phone_number='${client_phone_number}',`
      : "";
    query += client_password
      ? `client_password='${bcrypt.hashSync(client_password, 7)}',`
      : "";
    query += client_info ? `client_info='${client_info}',` : "";
    query += client_photo ? `client_photo='${client_photo}',` : "";
    query += client_is_active ? `client_is_active='${client_is_active}',` : "";
    query += otp_id ? `otp_id='${otp_id}',` : "";
    query = query.slice(0, query.length - 1);
    console.log(query);
    const client = (
      await pool.query(`Update client set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    res.ok(200, client);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = (
      await pool.query(`DELETE FROM client WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!client.length)
      return res.error(400, { friendlyMsg: "Client topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getClients,
  addClient,
  getClient,
  updateClient,
  deleteClient,
};
