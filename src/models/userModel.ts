export class UserModel {
    async findAll() {
        return [
            {'name': 'Pedro', 'age': 20},
            {'name': 'Júlia', 'age': 18}
        ];
    }
}