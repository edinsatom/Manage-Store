export class UserModel implements FireUser {
    
    cargo?:string;
    ingreso?:string;
    img?:string;

    constructor(
        public userName: string,
        public uid: string,
        public email: string,
        public password: string,
    ){}

    static blankUser(): UserModel {
        return new UserModel('', '', '', '')
    }
}

export interface IUserModel {
    uid: string;
    email: string;
    image: string;
    userName: string;
}

export class FireUser {
    
    constructor(
        public userName: string,
        public email: string,
        public uid: string,
    ){}

    static blankFireUser(): FireUser {
        return new FireUser('', '', '');
    }
}