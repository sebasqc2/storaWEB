import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './views/landing-page/landing-page.component'

const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'ver_landing', component: LandingPageComponent },
  { path: '**', redirectTo: 'ver_landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
