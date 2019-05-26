import { IUser } from './user'

export interface IBusiness{
    user: IUser;
    website: string;
    claimed: boolean;
    address: string;
}