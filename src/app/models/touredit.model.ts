export class ToursEdit {
    constructor(
        public id: string,
        public user_id: string,
        public cuidad: string,
        public pais: string,
        public placeID: string,
        public mapaGoogle: string,
        public puntoInicio: string,

        public name: string,
        public schedulle: string,

        public itinerary: string[],
        public whatsIncluded: string[],

        public categories: string,
        public duration: string,

        public lenguajes: string,

        public price: string,
        public moneda: string,
    ) { }

}
