export class  Prospectos {


    constructor(
        public user_id: string,
        public TipoProspecto: string,
        public nameContacto: string,
        public emailContacto: string,
        public telefonoContacto: string,
        public edad : string,
        public ciudad : string,
        public preguntasGuia : string,
        public comoNosConociste : string,
        public document_identificacion ? : string,
        public document_comprobantedomicilio ? : string,
        public document_cedulafiscal ? : string,
        public document_certificacion? : string,
        public estado ? : string,

    ) { }

}
