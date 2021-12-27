const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { deleteImage } = require('../middleware/imageDelete');
const { throwError } = require('../middleware/throwErrors');

exports.userRegister = async (req, res, next) => {
    try {
        console.log(req.file)
        const { name, password, email, gender, profile_pic } = req.body;
        const user_exist = await User.findOne({ email });
        if (user_exist) next(throwError(422, 'User already exist with this email'))
        const user = new User();
        user.password = await bcrypt.hash(password, 9);
        user.email = email;
        user.name = name;
        user.gender = gender;
        user.profile_pic = req.file.path.replace('public/', '');
        await user.save();

        res.status(200).json({ data: user, })
    } catch (err) {
        return next(throwError(422, "user already exist with this email"))
    }


}

exports.userLogin = async (req, res, next) => {
    try{
    const { email, password } = req.body
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        res.end("User is not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.end("Incorrect password.");
    } else {
        const token = await jwt.sign({ _id: user._id }, "secret");
        user.password = undefined;
        res.json({
            message: "Login successfully",
            token,
            user
        });
    }
    }catch (err) {
        return next(throwError(422, "Your password is incorrect"))
    }
}

exports.userGetProfile = async (req, res) => {
    const user = await User.findOne({ _id: req.user._id })
    res.json({
        message: "Your profile get successfully",
        data: user
    })
}




exports.userUpdate = async (req, res, next) => {
    const user = await User.findOne({ _id: req.user._id })
    if (!user) {
        res.send('User ont found')
    }

    if (req.file) {
        deleteImage(user.profile_pic)
        user.profile_pic = req.file.path.replace('public/', '');
    }

    const { email, password, name, gender, profile_pic } = req.body;
    user.name = name;
    user.email = email;
    user.password = password;
    user.gender = gender;

    await user.save();

    res.status(200).json({
        date: user,
        message: 'Your Profile Is Update Successfuly',

    })

}

exports.updatePassword = async (req, res, next) => {
    const { old_password, new_password } = req.body
    const user = await User.findOne({ _id: req.user._id }).select("+password");
    if (!user)
        return next(throwError(404, 'User not found.'))

    const isMatch = await bcrypt.compare(old_password, user.password);
    if (!isMatch)
        return next(throwError(422, 'Please enter a valid old password'))

    user.password = await bcrypt.hash(new_password, 8);
    await user.save();

    res.status(200).json({
        date: user,
        message: 'Your password is updated successfuly',
    })
}

