export class UserModel implements FireUser {
    
    cargo?:string;
    ingreso?:string;
    img?:string;

    constructor(
        public userName: string,
        public uid: string,
        public email: string,
        public password: string,
    ){
    }
}

export class FireUser {
    
    constructor(
        public userName: string,
        public email: string,
        public uid: string,
    ){}
}