export class Tours {
  
    constructor(
        public user_id: string,
        public cuidad: string,
        public pais: string,
        public placeID: string,
        public mapaGoogle: string,
        public puntoInicio: string,

        public name: string,
        public nameIngles: string,
        public schedulle: string,

        public itinerary: string[],
        public whatsIncluded: string[],

        public categories: string,
        public duration: string,

        public lenguajes: string,

        public price: string,
        public moneda: string,

        public slug?: number,
        public priceFinal?: number,
        public calification?: string,
        public id?: string,
        public get_photos?: string[],
        public lenguaje?: string,
        public verificado?: string,
    ) { }

}
