import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON(); //  Instance Method

    res.status(StatusCodes.OK).json({
        user: userWithoutPassword,
    });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();
    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({
        users: users,
        jobs: jobs,
    });
};

export const updateUser = async (req, res) => {
    // console.log(req.file);

    const newUser = { ...req.body };
    delete newUser.password;
    // console.log(obj);

    if (req.file) {
        const response = await cloudinary.v2.uploader.upload(req.file.path);
        await fs.unlink(req.file.path); //removes the image file from the local file system.

        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

    // if req.file exist
    // and if updatedUser.avatarPublicId exist
    // destroy / delete previously uploaded avatar image in the cloudinary
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({
        message: "Update User",
    });
};
