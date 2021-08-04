import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ShoppingService} from '../../services/ShoppingCarService/shopping.service';

@Component({
  selector: 'app-shopping-car',
  templateUrl: './shopping-car.component.html',
  styleUrls: ['./shopping-car.component.css'],
  providers: [ ShoppingService],
})

export class ShoppingCarComponent implements OnInit {
  @Output("closeShoppingModal") closeShoppingModal: EventEmitter<any> = new EventEmitter();
  productos =[];
  cantidades=[];
  car;
  constructor(  private carrito:ShoppingService) {
    this.productos= JSON.parse(localStorage.getItem("cartProductos"));
    this.cantidades = JSON.parse(localStorage.getItem("cartCantidades"));
   }


  ngOnInit(): void {
    
    console.log('puto');
 
    this.getCarrito()
  }

  getCarrito(){
    
    // let codigos =[]; 
    // this.productos.forEach(element => {
    //   codigos.push(element.codigo);
    // });
    // let cantidadesJson = {}
    // this.cantidades.forEach(element => {
    //   cantidadesJson[element.codigo] = element.cantidad
    // });
    // console.log(this.productos);
    // console.log(cantidadesJson);
    
    // this.car = new pedido(this.getRandom(2500,5000),new Date(),0,localStorage.getItem("usuario"),this.codigos,);
  }
  getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }


  //this.closeShoppingModal.emit();
  

}
