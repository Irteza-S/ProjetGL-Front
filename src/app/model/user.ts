import { UserType } from './userole';

export class User {
    id: number;
    firstName: string;
    lastName: string;
    role: UserType;
    token?: string;

    constructor(ID: number, FIRSTNAME: string, LASTNAME: string, ROLE: UserType, TOKEN?: string) {
        this.id = ID;
        this.firstName = FIRSTNAME;
        this.lastName = LASTNAME;
        this.role = ROLE;
        this.token = TOKEN;
    }
}
