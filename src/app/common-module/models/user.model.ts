export class UserModel {
    
    cargo?:string;
    ingreso?:string;
    img?:string;

    constructor(
        public uid: string,
        public email: string,
        public userName: string,
        public password: string
    ){
    }
    
}