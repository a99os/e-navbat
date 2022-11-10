const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_socials = async (req, res) => {
  try {
    const spec_socials = await pool.query("SELECT * FROM spec_social");
    res.status(200).json(spec_socials.rows);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const addSpec_social = async (req, res) => {
  try {
    const { spec_id, social_id, social_link } = req.body;
    console.log(req.body);

    const newSpec_social = await pool.query(
      `INSERT INTO spec_social (spec_id, social_id, social_link) 
      VALUES ($1,$2,$3) RETURNING *`,
      [spec_id, social_id, social_link]
    );
    res.ok(200, newSpec_social.rows);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const getSpec_social = async (req, res) => {
  try {
    const spec_social = (
      await pool.query(`SELECT * FROM spec_social WHERE id=$1`, [req.params.id])
    ).rows;
    if (!spec_social.length)
      return res.error(400, { friendlyMsg: "spec_social topilmadi" });
    res.ok(200, spec_social);
  } catch (error) {
    ApiError.internal(res, error);
  }
};
const updateSpec_social = async (req, res) => {
  try {
    const { spec_id, social_id, social_link } = req.body;
    let query = "";
    query += spec_id ? `spec_id=${spec_id},` : "";
    query += social_id ? `social_id=${social_id},` : "";
    query += social_link ? `social_link=${social_link},` : "";

    query = query.slice(0, query.length - 1);
    const spec_social = (
      await pool.query(
        `Update spec_social set ${query} WHERE id=$1 returning *`,
        [req.params.id]
      )
    ).rows;
    if (!spec_social.length)
      return res.error(400, { friendlyMsg: "spec_social topilmadi" });
    res.ok(200, spec_social);
  } catch (error) {
    ApiError.internal(res, error);
  }
};

const deleteSpec_social = async (req, res) => {
  try {
    const spec_social = (
      await pool.query(`DELETE FROM spec_social WHERE id=$1 returning *`, [
        req.params.id,
      ])
    ).rows;
    if (!spec_social.length)
      return res.error(400, { friendlyMsg: "spec_social topilmadi" });
    res.ok(200, { message: "O'chirildi" });
  } catch (error) {
    ApiError.internal(res, error);
  }
};

module.exports = {
  getSpec_socials,
  addSpec_social,
  getSpec_social,
  updateSpec_social,
  deleteSpec_social,
};
