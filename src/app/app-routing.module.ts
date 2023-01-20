import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MontarBlocosThreeComponent } from './montar-blocos-three/montar-blocos-three.component';
import { CameraThreeComponent } from './pages/camera-three/camera-three.component';
import { ControleObjetoThreeComponent } from './pages/controle-objeto-three/controle-objeto-three.component';
import { CriarObjetosThreeComponent } from './pages/criar-objetos-three/criar-objetos-three.component';
import { GravidadeComponent } from './pages/gravidade/gravidade.component';
import { InteragirObjetoThreeComponent } from './pages/interagir-objeto-three/interagir-objeto-three.component';
import { ThreeComponent } from './pages/three/three.component';

const routes: Routes = [
  {
    path: 'gravidade',
    component: GravidadeComponent
  },
  {
    path: 'three',
    component: ThreeComponent
  }, 
  {
    path: 'camera-three',
    component: CameraThreeComponent
  },
  {
    path: 'controle-objeto-three',
    component: ControleObjetoThreeComponent
  },
  {
    path: 'criar-objetos-three',
    component: CriarObjetosThreeComponent
  },
  {
    path: 'interagir-objetos-three',
    component: InteragirObjetoThreeComponent
  },
  {
    path: 'montar-blocos-three',
    component: MontarBlocosThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
