export class Usuario {


    constructor(
        public name: string,
        public email: string,
        public password?: string,
        public img?: string,
        public telephone?: string,
        public infopersonal?: string,
        public role?: string,
        public google?: boolean,
        public id?: string,
        public verified?: string,
        public sexo?: string,
        public archivovalidacion?: string,

    ) { }

}
