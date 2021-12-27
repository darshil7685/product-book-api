const Contact = require("../models/Contact");
const mongoose = require("mongoose");

exports.addContact = async (req, res, next) => {
  const { phonNumber, email, addres } = req.body;
  const contact = new Contact();
  contact.phonNumber = phonNumber;
  contact.email = email;
  contact.addres = addres;
  contact.userId = req.user._id;
  await contact.save();

  res.status(200).json({
    message: "Contact added successfully.",
    data: contact,
  });
};

exports.getAllContact = async (req, res, next) => {
  const contac = await Contact.find({
    userId: mongoose.Types.ObjectId(req.user._id),
  });

  res.status(200).json({
    data: contac,
  });
};

exports.updateContact = async (req, res, next) => {
  const contac = await Contact.findOne({ _id: req.params._id });
  if (!contac) {
    res.send("Contact not found");
  }
  const { phonNumber, email, addres } = req.body;
  contac.phonNumber = phonNumber;
  contac.email = email;
  contac.addres = addres;

  await contac.save();

  res.status(200).json({
    date: contac,
    message: "Your contact Is Update Successfuly",
  });
};

exports.deleteContect = async (req, res) => {
    const contac = await Contact.deleteOne({ _id: req.params._id, userId: mongoose.Types.ObjectId(req.user._id) })

    res.status(200).json({
        message: "Your contact has been deleted",

    });
}
