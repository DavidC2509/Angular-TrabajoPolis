import { City } from './city';
export interface RespuestaTopResume {
    res: boolean;
    message: string;
    reason: boolean;
    validator: Resume;
    resumes: Resume[];
    resumen: Resume;
}
export interface Resume {
    id: number;
    trabajosAnteriores: string;
    created_at: Date;
    logros: string;
    profesion: string;
    telefono: string;
    fechaNacimiento: string;
    city_id: string;
    user_id: number;
    ciudad: City;

}
