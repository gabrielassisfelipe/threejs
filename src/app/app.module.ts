import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GravidadeComponent } from './pages/gravidade/gravidade.component';
import { ThreeComponent } from './pages/three/three.component';
import { CameraThreeComponent } from './pages/camera-three/camera-three.component';
import { ControleObjetoThreeComponent } from './pages/controle-objeto-three/controle-objeto-three.component';
import { CriarObjetosThreeComponent } from './pages/criar-objetos-three/criar-objetos-three.component';
import { InteragirObjetoThreeComponent } from './pages/interagir-objeto-three/interagir-objeto-three.component';
import { MontarBlocosThreeComponent } from './montar-blocos-three/montar-blocos-three.component';

@NgModule({
  declarations: [
    AppComponent,
    ThreeComponent,
    GravidadeComponent,
    CameraThreeComponent,
    ControleObjetoThreeComponent,
    CriarObjetosThreeComponent,
    InteragirObjetoThreeComponent,
    MontarBlocosThreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ dropSpecialCharacters: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
