const pool = require("../config/db");
const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");

const getAdmins = async (req, res) => {
  try {
    const admins = await pool.query("SELECT * FROM admin");
    res.status(200).json(admins.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_phone_number,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;

    if (
      (
        await pool.query(`SELECT * FROM admin WHERE admin_phone_number=$1`, [
          admin_phone_number,
        ])
      ).rows.length
    )
      return res.error(400, { friendlyMsg: "Bunday phone mavjud" });

    const newAdmin = await pool.query(
      `INSERT INTO admin (admin_name, admin_phone_number, admin_password, admin_is_active, admin_is_creator) 
      VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [
        admin_name,
        admin_phone_number,
        bcrypt.hashSync(admin_password, 7),
        admin_is_active,
        admin_is_creator,
      ]
    );
    res.ok(200, newAdmin.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = (
      await pool.query(`SELECT * FROM admin WHERE id=$1`, [req.params.id])
    ).rows;
    if (!admin.length)
      return res.error(400, { friendlyMsg: "admin topilmadi" });
    res.ok(200, admin);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateAdmin = async (req, res) => {
  try {
    const {
      admin_name,
      admin_phone_number,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    let query = "";
    query += admin_name ? `admin_name='${admin_name}',` : "";
    query += admin_phone_number
      ? `admin_phone_number='${admin_phone_number}',`
      : "";
    query += admin_password
      ? `admin_password='${bcrypt.hashSync(admin_password, 7)}',`
      : "";
    query += admin_is_active ? `admin_is_active='${admin_is_active}',` : "";
    query += admin_is_creator ? `admin_is_creator='${admin_is_creator}',` : "";

    query = query.slice(0, query.length - 1);
    const admin = (
      await pool.query(`Update admin set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    res.ok(200, admin);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = (
      await pool.query(`DELETE FROM admin WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!admin.length)
      return res.error(400, { friendlyMsg: "admin topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getAdmins,
  addAdmin,
  getAdmin,
  updateAdmin,
  deleteAdmin,
};
