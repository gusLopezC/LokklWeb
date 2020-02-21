
export class Guia {
  
  constructor(
    public user_id: string,
    public pais: string,
    public tipomoneda: string,
    public clabeInterbancaria: string,
    public numeroCuenta: string,
    public RFC: string,
    public CURP: string,
    public name?: string,
    public img?: string,
  ) { }
}
