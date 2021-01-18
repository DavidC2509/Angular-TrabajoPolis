export interface RespuestaTopCity {
    res: boolean;
    message: string;
    ciudades: City[];
    ciudad: City;
}
export interface City {
    id: number;
    nombre: string;
}
