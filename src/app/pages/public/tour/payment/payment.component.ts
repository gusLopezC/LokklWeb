import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import swal from 'sweetalert2';

import { ToursService, UsuarioService, PaymentService } from 'src/app/services/service.index';
import { Tours } from 'src/app/models/tour.model';
import { Payment } from 'src/app/models/payment.model';
import { Usuario } from 'src/app/models/usuario.model';



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

  slug: { slug: string };
  cargando = true;
  mostrarPagoCard = true;
  mostrarPagoPaypal = false;
  botondefault = true;
  tour: Tours;
  showSuccess: boolean;
  public fechaReserva;
  public totalPagar;
  public cantidadTuristas;
  public precioNormal;
  public price;
  submitted: boolean;
  formProcess: boolean;
  message: string;
  customStripeForm: FormGroup;
  tokenStripe = '';
  usuario: Usuario;
  complete = false;


  constructor(

    private rutaActiva: ActivatedRoute,
    public _toursService: ToursService,
    public _usuarioService: UsuarioService,
    public _PaymentService: PaymentService,
    public router: Router,
    private route: ActivatedRoute, ) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.tour = this.router.getCurrentNavigation().extras.state.tour;
        this.fechaReserva = this.router.getCurrentNavigation().extras.state.fecha;
        this.cantidadTuristas = this.router.getCurrentNavigation().extras.state.cantidadTuristas;
      }
    });
    this.verificarSesion();
  }

  ngOnInit() {
    this.customStripeForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      telephone: new FormControl(null, Validators.required),
      name_card: new FormControl(null, Validators.required),
      cardNumber: new FormControl(null, Validators.required),
      ccv: new FormControl(null, Validators.required),
      expMonth: new FormControl(null, Validators.required),
      expYear: new FormControl(null, Validators.required),
    });
    this.loadStripe();
    this.slug = {
      slug: this.rutaActiva.snapshot.params.slug,
    };
    this.cargando = true;
    this.complete = false;
    this.cargarTour();


  }

  async cargarTour() {
    await this._toursService.obtenerTour(this.slug.slug)
      .subscribe((resp: any) => {
        this.tour = resp.Tour;
        this.price = this.tour.price;
        this.precioNormal = (this.price * this.cantidadTuristas).toFixed(2);
        this.totalPagar = (this.tour.priceFinal * this.cantidadTuristas).toFixed(2);
        this.cantidadTuristas = this.cantidadTuristas;
        this.initConfig();
        this.cargando = false;
      });

  }// end cargar tour

  mostrarMetodoPago(metodo: string) {
    // tslint:disable-next-line: triple-equals
    if (metodo === 'Card') {
      this.mostrarPagoCard = true;
      this.mostrarPagoPaypal = false;
    }
    if (metodo === 'Paypal') {
      this.mostrarPagoCard = false;
      this.mostrarPagoPaypal = true;
    }
  }

  /**
   * Pago con Stripe
   */

  loadStripe() {

    if (!window.document.getElementById('stripe-custom-form-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-custom-form-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window['Stripe'].setPublishableKey('pk_live_MFjCYjJg6B1jNNx5mUaSwFRY00q1xLT3gH');
      }

      window.document.body.appendChild(s);
    }
  }

  pay(form) {

    if (!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }

    this.submitted = true;
    if (this.customStripeForm.invalid) {
      return;
    }
    this.formProcess = true;
    if (!window['Stripe']) {
      alert('Oops! Stripe did not initialize properly.');
      return;
    }

    // Creaccion token
    (<any>window).Stripe.card.createToken({
      number: form.cardNumber,
      exp_month: form.expMonth,
      exp_year: form.expYear,
      cvc: form.cvc
    }, (status: number, response: any) => {
      this.submitted = false;
      this.formProcess = false;

      if (status === 200) {
        this.tokenStripe = response.id;
      } else {
        console.log('A ocurrido un error');
        console.log(response.error.message);
        this.message = response.error.message;
      }
    });
    setTimeout(() => {
      this.creacionPago(form.name, form.lastname, form.email, form.telephone, form.cardNumber);
    }, 1500);

  }

  creacionPago(name: string, lastname: string, email: string, telephone: string, cardNumber: string) {

    if (this.tokenStripe === '' || this.tokenStripe == null) {
      swal.fire({
        icon: 'error',
        title: 'A ocurrido un error por favor recarga la pagina',
        showConfirmButton: false,
        timer: 4500
      });
      return false;
    }
    const pago = new Payment(
      this.usuario.id,
      name,
      lastname,
      email,
      telephone,
      cardNumber,
      this.totalPagar,
      this.tour.moneda,
      this.fechaReserva,
      this.cantidadTuristas,
      this.tokenStripe,
      this.tour.id,
      this.tour.name,
      this.tour.user_id,
    );
    this._PaymentService.crearPagoStripe(pago)
      .subscribe(resp => {
        window.scroll(0, 0);
        swal.fire({
          icon: 'success',
          title: 'Pago realizado',
          showConfirmButton: false,
          timer: 4500
        });
        this.router.navigate(['/users/myTraverls']);
      });

  }

  /**
   * Finalizacion pago con Stripe
   */

  /**
   * Pago con Paypal
   */

  // ConfiguracionPaypal
  private initConfig(): void {

    this.payPalConfig = {
      currency: this.tour.moneda,
      // Desarrollo: AXPRJfvbU9VltaAkPf04PYcQ_CEh2GFloyQNKDjd4Wxx9vBDCi66edW7yHAVV1CcfS4IeGlH1LrcxiVf
      // Production: Afm-7MnAZh_K1VOBPwadYtmuSqTlUDdAlMMyrkJfFs8lIZz5RmVAGbfW7Qcaz4q3glDBfZMYUkgj6Lgf

      clientId: 'Afm-7MnAZh_K1VOBPwadYtmuSqTlUDdAlMMyrkJfFs8lIZz5RmVAGbfW7Qcaz4q3glDBfZMYUkgj6Lgf',
      // tslint:disable-next-line: no-angle-bracket-type-assertion
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: this.tour.moneda,
              value: this.totalPagar,
              breakdown: {
                item_total: {
                  currency_code: this.tour.moneda,
                  value: this.totalPagar
                }
              }
            },
            items: [
              {
                name: this.tour.name,
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: this.tour.moneda,
                  value: this.totalPagar,
                },
              }
            ]
          }
        ]
      },

      onApprove: (data, actions) => {
        console.log('onApprove: la transacción se aprobó, pero no se autorizó', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove: puede obtener todos los detalles del pedido en onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        // tslint:disable-next-line: max-line-length
        console.log('onClientAuthorization: probablemente debería informar a su servidor sobre la transacción completada en este momento', data);
        this.sendDataPaymentPaypal(data.id, data.payer);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }// end paypal

  sendDataPaymentPaypal(idPagoPaypal: string, datosCliente: any) {

    const pago = new Payment(
      this.usuario.id,
      datosCliente.name.given_name,
      datosCliente.name.surname,
      datosCliente.email_address,
      '',
      idPagoPaypal,
      this.totalPagar,
      this.tour.moneda,
      this.fechaReserva,
      this.cantidadTuristas,
      datosCliente.payer_id,
      this.tour.id,
      this.tour.name,
      this.tour.user_id,
    );

    this._PaymentService.crearPagoPaypal(pago)
      .subscribe(resp => {

        window.scroll(0, 0);
        swal.fire({
          icon: 'success',
          title: 'Pago realizado',
          showConfirmButton: false,
          timer: 4500
        });
        this.router.navigate(['/users/myTraverls']);
      });
  }



  verificarSesion() {
    this.usuario = this._usuarioService.user;
    if (!(localStorage.getItem('user'))) {
      swal.fire(
        'Importante',
        'Por favor inicia sesión para continuar',
        'warning');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 4000);
    }
  }
}
