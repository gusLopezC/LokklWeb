
export class Chat {

    constructor(
      public photo: string,
      public sender: string,
      public senderID: string,
      public message: string,
      public timestap: string,
      public id?: string,
    ) { }
  }
