export class User {
    name: string;
    username: string;
    password: string;
    cpf: string;
    email: string

    constructor(item) {
        const { name, username, cpf, email, password } = item;
        this.name = name;
        this.username = username;
        this.cpf = cpf;
        this.email = email
        this.password = password
    }
}