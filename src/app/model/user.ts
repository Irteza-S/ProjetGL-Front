import { UserType } from './userole';

export enum Gender {
    Male = 'M.',
    Female = 'Mme.',
}

export class User {
    id: number;
    gender: Gender;
    firstName: string;
    lastName: string;
    role: UserType;
    token?: string;

    constructor(ID: number, GENDER: Gender, FIRSTNAME: string, LASTNAME: string, ROLE: UserType, TOKEN?: string) {
        this.id = ID;
        this.gender = GENDER;
        this.firstName = FIRSTNAME;
        this.lastName = LASTNAME;
        this.role = ROLE;
        this.token = TOKEN;
    }
}
