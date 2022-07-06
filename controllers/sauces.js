const Sauce = require("../models/Sauce");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { findOne } = require("../models/User");

const getAllSauces = async (req, res) => {
  const sauces = await Sauce.find({});
  res.status(StatusCodes.OK).json({ sauces });
};

const getSauce = async (req, res) => {
  const sauce = await Sauce.findOne({ _id: req.params.id });
  if (!sauce) {
    throw new NotFoundError(`no sauce with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ sauce });
};

const createSauce = async (req, res) => {
  req.body.userId = req.user.userId;
  const sauce = await Sauce.create(req.body);
  res.status(StatusCodes.CREATED).json({ sauce });
};

const updateSauce = async (req, res) => {
  const {
    body: { name, manufacturer, description, mainPepper },
    user: { userId },
    params: { id: sauceId },
  } = req;
  const currentUser = req.user.userId;
  if (
    name === "" ||
    manufacturer === "" ||
    description === "" ||
    mainPepper === ""
  ) {
    throw new BadRequestError("Fields cant be empty");
  }
  const sauceOwnerCheck = await Sauce.find({
    _id: req.params.id,
  });
  console.log(sauceOwnerCheck[0].userId);
  console.log(userId);
  if (sauceOwnerCheck[0].userId !== currentUser) {
    return res
      .status(404)
      .json({
        message:
          "You are not the owner of this sauce , you are not allowed to modify it.",
      });
  }

  const sauce = await Sauce.findByIdAndUpdate(
    { _id: sauceId, userId: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!sauce) {
    throw new NotFoundError(`You dont own a sauce with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ sauce });
};

const deleteSauce = async (req, res) => {
  const {
    user: { userId },
    params: { id: sauceId },
  } = req;
  const currentUser = req.user.userId;
  const sauceOwnerCheck = await Sauce.find({
    _id: req.params.id,
  });
  if (sauceOwnerCheck[0].userId !== currentUser) {
    return res
      .status(404)
      .json({
        message:
          "You are not the owner of this sauce , you are not allowed to delete it.",
      });
  }
  const sauce = await Sauce.findOneAndDelete({
    _id: sauceId,
    userId: userId,
  });
  if (!sauce) {
    throw new NotFoundError(`You dont own a sauce with id ${req.params.id}`);
  }
  res.status(StatusCodes.OK).send();
};

const likeSauce = async (req, res) => {
  res.send("like sauce");
};
module.exports = {
  getAllSauces,
  getSauce,
  createSauce,
  updateSauce,
  deleteSauce,
  likeSauce,
};
