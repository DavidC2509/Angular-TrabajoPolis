import { City } from './city';
import { User } from './user';
import { Category, Category2 } from './category';
export interface RespuestaTopJob {
    res: boolean;
    message: string;
    reason: boolean;
    validator: Job;
    publicaciones: Job[];
    publicacion: Job;
}
export interface Job {
    id: number;
    titulo: string;
    descripcion: string;
    empresa: string;
    fechaPublicacion: Date;
    telefono: string;
    email: string;
    ciudad: City;
    user_id: number;
    categorias: Category2[];
}
