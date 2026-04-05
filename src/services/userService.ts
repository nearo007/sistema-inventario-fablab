import { UserModel } from "../models/userModel"

export class UserService {
    private userModel = new UserModel();

    async getUsers() {
        return this.userModel.findAll();
    }
}