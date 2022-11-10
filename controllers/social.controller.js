const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSocials = async (req, res) => {
  try {
    const socials = await pool.query("SELECT * FROM social");
    res.status(200).json(socials.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    console.log(req.body);

    const newSocial = await pool.query(
      `INSERT INTO social (social_name, social_icon_file) 
      VALUES ($1,$2) RETURNING *`,
      [social_name, social_icon_file]
    );
    res.ok(200, newSocial.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getSocial = async (req, res) => {
  try {
    const social = (
      await pool.query(`SELECT * FROM social WHERE id=$1`, [req.params.id])
    ).rows;
    if (!social.length)
      return res.error(400, { friendlyMsg: "social topilmadi" });
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateSocial = async (req, res) => {
  try {
    const { social_name, social_icon_file } = req.body;
    let query = "";
    query += social_name ? `social_name='${social_name}',` : "";
    query += social_icon_file ? `social_icon_file='${social_icon_file}',` : "";
    query = query.slice(0, query.length - 1);
    const social = (
      await pool.query(`Update social set ${query} WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!social.length)
      return res.error(400, { friendlyMsg: "social topilmadi" });
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteSocial = async (req, res) => {
  try {
    const social = (
      await pool.query(`DELETE FROM social WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!social.length)
      return res.error(400, { friendlyMsg: "social topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getSocials,
  addSocial,
  getSocial,
  updateSocial,
  deleteSocial,
};
