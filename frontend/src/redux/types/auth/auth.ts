export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    organization: string;
}

export interface AuthState {
    user:IUser | null;
    isAuthenticated?: boolean;
  }
  

// -----------Actions Types------------ //
export interface ILoginFormData{
    email: string;
    password: string;
}
export interface IRegisterFormData{
    firstName: string;
    lastName: string;
    organization: string;
    email: string;
    password: string;
}
// -----------Actions Types------------ //