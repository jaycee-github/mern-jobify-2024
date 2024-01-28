import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: "lastName",
    },
    location: {
        type: String,
        default: "philippines",
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    avatar: String,
    avatarPublicId: String,
});

// Instance Method
// This custom method removes the password property
UserSchema.methods.toJSON = function () {
    let obj = this.toObject(); // converts this model to object
    delete obj.password; // removes the password property
    return obj; // returns the updated obj
};

export default mongoose.model("User", UserSchema);
