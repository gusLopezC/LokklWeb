export class Payment {
    constructor(
        public id_user: string,
        public name: string,
        public lastname: string,
        public email: string,
        public telephone: string,
        public NumTarjeta: string,
        public price: string,
        public moneda: string,
        public fecha: string,
        public cantidadTurtias: string,
        public stripeToken: string,
        public id_tour: string,
        public name_tour: string,
        public id_vendedor: string,
    ) { }

}
