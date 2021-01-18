import { Validator } from '@angular/forms';

export interface RespuestaTopUser {
    res: boolean;
    status: number;
    message: string;
    reason: boolean;
    validator: User;
    usuarios: User[];
    usuario: User;
    access_token: string;
}
export interface User {
    id: number;
    nombres: string;
    apellidos: string;
    email: string;
    password: string;
    rol: string;
}
