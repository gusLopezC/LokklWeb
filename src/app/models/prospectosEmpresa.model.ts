export class  ProspectosEmpresa {


    constructor(
        public user_id: string,
        public ciudad: string,
        public TipoProspecto: string,
        
        public nameempresa: string,
        public nombreempresaLegal: string,

        public emailContacto: string,

        //DatosContactoEmpresa
        public ciudadContacto: string,
        public CP: string,
        public dirección: string,
        
        //Datos Contacto
        public nombreContacto: string,
        public puestoTrabajo: string,
        public telefonocontacto: string,

        public telefono?: string,
        public sitioweb?: string,

    ) { }

}
