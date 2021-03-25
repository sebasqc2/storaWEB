import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { VerProductoClienteComponent } from './views/ver-producto-cliente/ver-producto-cliente.component';
import { ProductoTiendaComponent } from './views/producto-tienda/producto-tienda.component';
import { AgregarProductoComponent } from './views/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './views/editar-producto/editar-producto.component';

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'detalles_producto', component: VerProductoClienteComponent },
  { path: 'mis_productos', component: ProductoTiendaComponent },
  { path: 'agregar_producto', component: AgregarProductoComponent },
  { path: 'editar_producto', component: EditarProductoComponent },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
