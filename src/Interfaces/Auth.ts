export interface IRegister {
    username: string;
    password: string;
    email: string;
    confirmPassword: string;
  }
  
  export interface IErrorState {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    generic?: string;
  }

 export  interface ILogin{
    email:string;
    password:string
  }
  
