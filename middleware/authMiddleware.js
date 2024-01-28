import {
    UnauthenticatedError,
    UnauthorizedError,
    BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        throw new UnauthenticatedError("authentication invalid");
    }

    try {
        const { userId, role } = verifyJWT(token);
        const testUser = userId === "65b3cb1d0a78db1bd1d0bbd3";

        req.user = {
            userId: userId,
            role: role,
            testUser: testUser,
        };

        next();
    } catch (error) {
        throw new UnauthenticatedError("authentication invalid");
    }
};

export const authorizePermissions = (...roles) => {
    // Needs to return a function since in the userRouter because
    // this function (authorizePermissions) gets invoked right away.
    return (req, res, next) => {
        console.log(roles);

        if (!roles.includes(req.user.role)) {
            throw new UnauthorizedError("unauthorized to access this route");
        }

        next();
    };
};

export const checkForTestUser = (req, res, next) => {
    if (req.user.testUser) {
        throw new BadRequestError("Demo User : Read only");
    }

    next();
};
