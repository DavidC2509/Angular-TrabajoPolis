export interface RespuestaTopCategory {
    res: boolean;
    message: string;
    categorias: Category[];
    categoria: Category;
}
export interface Category {
    id: number;
    nombre: string;
    job_category: jobCategory[];
}
// tslint:disable-next-line: class-name
export interface jobCategory {
    id: number;
    jod_id: number;
    category_id: number;
}
export class Category2 {
    id: string;
    nombre: string;
    constructor(id: string,
                nombre: string) {
                    this.id = id;
                    this.nombre = nombre;
                }
}

