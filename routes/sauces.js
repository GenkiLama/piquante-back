const express = require("express");
const router = express.Router();

const {
  getAllSauces,
  getSauce,
  createSauce,
  updateSauce,
  deleteSauce,
  likeSauce,
} = require("../controllers/sauces");

router.route("/").post(createSauce).get(getAllSauces);
router.route("/:id").get(getSauce).delete(deleteSauce).patch(updateSauce);
router.route("/:id/like").post(likeSauce);

module.exports = router;
