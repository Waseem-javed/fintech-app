import { IUser } from "redux/types/auth/auth";

export interface INavbarProps{
    profile:{
        isAuth:boolean | undefined;
        user:IUser | null
    };
}