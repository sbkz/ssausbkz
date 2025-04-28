import $api from "../http";
import {AxiosResponse} from 'axios';
import { IUser } from "../modelTypes/reponses";


export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
}