const pool = require("../config/db");
const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");

const getSpecs = async (req, res) => {
  try {
    const specs = await pool.query("SELECT * FROM spec");
    res.status(200).json(specs.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addSpec = async (req, res) => {
  try {
    const {
      spec_position,
      spec_first_name,
      spec_last_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_phone_number,
      spec_password,
      spec_info,
      spec_is_active,
      show_position,
      show_first_name,
      show_last_name,
      show_middle_name,
      show_birth_day,
      show_photo,
      show_social,
      show_phone_number,
      show_info,
      otp_id,
    } = req.body;

    if (
      (
        await pool.query(`SELECT * FROM Spec WHERE spec_phone_number=$1`, [
          spec_phone_number,
        ])
      ).rows.length
    )
      return res.error(400, { friendlyMsg: "Bunday telefon raqam mavjud" });

    const newSpec = await pool.query(
      `INSERT INTO spec (
        spec_position,
        spec_first_name,
        spec_last_name,
        spec_middle_name,
        spec_birth_day,
        spec_photo,
        spec_phone_number,
        spec_password,
        spec_info,
        spec_is_active,
        show_position,
        show_first_name,
        show_last_name,
        show_middle_name,
        show_birth_day,
        show_photo,
        show_social,
        show_phone_number,
        show_info,
        otp_id) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *`,
      [
        spec_position,
        spec_first_name,
        spec_last_name,
        spec_middle_name,
        spec_birth_day,
        spec_photo,
        spec_phone_number,
        spec_password,
        spec_info,
        spec_is_active,
        show_position,
        show_first_name,
        show_last_name,
        show_middle_name,
        show_birth_day,
        show_photo,
        show_social,
        show_phone_number,
        show_info,
        otp_id,
      ]
    );
    res.ok(200, newSpec.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getSpec = async (req, res) => {
  try {
    const spec = (
      await pool.query(`SELECT * FROM Spec WHERE id=$1`, [req.params.id])
    ).rows;
    if (!spec.length) return res.error(400, { friendlyMsg: "Spec topilmadi" });
    res.ok(200, spec);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateSpec = async (req, res) => {
  try {
    const {
      spec_position,
      spec_first_name,
      spec_last_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_phone_number,
      spec_password,
      spec_info,
      spec_is_active,
      show_position,
      show_first_name,
      show_last_name,
      show_middle_name,
      show_birth_day,
      show_photo,
      show_social,
      show_phone_number,
      show_info,
      otp_id,
    } = req.body;
    let query = "";
    query += spec_position ? `spec_position='${spec_position}',` : "";
    query += spec_first_name ? `spec_first_name='${spec_first_name}',` : "";
    query += spec_last_name ? `spec_last_name='${spec_last_name}',` : "";
    query += spec_middle_name ? `spec_middle_name='${spec_middle_name}',` : "";
    query += spec_birth_day ? `spec_birth_day='${spec_birth_day}',` : "";
    query += spec_phone_number
      ? `spec_phone_number='${spec_phone_number}',`
      : "";
    query += spec_password
      ? `spec_password='${bcrypt.hashSync(spec_password, 7)}',`
      : "";
    query += spec_info ? `spec_info='${spec_info}',` : "";
    query += spec_photo ? `spec_photo='${spec_photo}',` : "";
    query += spec_is_active ? `spec_is_active=${spec_is_active},` : "";
    query += show_position ? `show_position=${show_position},` : "";
    query += show_first_name ? `show_first_name=${show_first_name},` : "";
    query += show_last_name ? `show_last_name=${show_last_name},` : "";
    query += show_middle_name ? `show_middle_name=${show_middle_name},` : "";
    query += show_birth_day ? `show_birth_day=${show_birth_day},` : "";
    query += show_phone_number ? `show_phone_number=${show_phone_number},` : "";
    query += show_social ? `show_social=${show_social},` : "";
    query += show_info ? `show_info=${show_info},` : "";
    query += show_photo ? `show_photo=${show_photo},` : "";
    query += otp_id ? `otp_id='${otp_id}',` : "";
    query = query.slice(0, query.length - 1);
    const spec = (
      await pool.query(`Update spec set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    res.ok(200, spec);
  } catch (error) {
    console.log(error);
    ApiError.internal(res, error);
  }
};

const deleteSpec = async (req, res) => {
  try {
    const spec = (
      await pool.query(`DELETE FROM spec WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!spec.length) return res.error(400, { friendlyMsg: "Spec topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getSpecs,
  addSpec,
  getSpec,
  updateSpec,
  deleteSpec,
};
