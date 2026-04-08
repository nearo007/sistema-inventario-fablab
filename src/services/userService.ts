import { UserModel } from "../models/userModel"

export class UserService {
    private userModel = new UserModel();

    async getUsers() {
        return this.userModel.findAll();
    }

    async createUser(user: String) {
        return `Usuário ${user} criado no sistema.`
    }
}