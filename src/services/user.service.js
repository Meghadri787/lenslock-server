import { Users } from "../model/user.model.js";

class UserService {
    async createUser(body) {
        const data = await Users.create({
            name: body.name,
            email: body.email,
            password: body.password,
            profile_pic: body.profile_pic, // optional
            role: body.role, // optional
            otp: body.otp, // optional
            otpExpiary: body.otpExpiary, // optional
            isProfileComplete: body.isProfileComplete, // optional
        });

        return data;
    }

    async login({ email, password }) {
        const user = await Users.findOne({ email }).select("+password");

        if (!user) {
            throw new Error("Invalid email or password");
        }

        user.password = undefined;

        return user;
    }
}

export default new UserService();
