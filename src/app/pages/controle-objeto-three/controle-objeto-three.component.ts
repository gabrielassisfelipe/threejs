import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-controle-objeto-three',
  templateUrl: './controle-objeto-three.component.html',
  styleUrls: ['./controle-objeto-three.component.scss']
})
export class ControleObjetoThreeComponent implements AfterViewInit {

  @ViewChild('canvasControleObjetoThree') private canvasRef: ElementRef;
  widthCanvas: number = 1600;
  heightCanvas: number = 700;

  camera: THREE.PerspectiveCamera;
  cameraFieldOfView: number = 45;
  cameraNearClippingPlane: number = 0.1;
  cameraFarClippingPlane: number = 1000;
  cameraPositionZ = 5;

  controls: OrbitControls;
  mousePressed = false;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  constructor() { }

  ngAfterViewInit(): void {
    this.criarCena();
    this.adicionarObjeto();
  }

  private criarCena(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    /* Os objetos mais distantes da câmera do que o valor far (cameraFarClippingPlane) ou mais próximos que o valor near (cameraNearClippingPlane) não serão renderizados */
    this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.canvas.width / this.canvas.height, this.cameraNearClippingPlane, this.cameraFarClippingPlane);
    this.camera.position.z = this.cameraPositionZ;

    this.controls = new OrbitControls(this.camera, this.canvas);

    this.renderizar();
  }

  private renderizar(): void {
    /* Usamos WebGLRenderer pois vamos trabalhar com navegadores atualizados que suportam webGL */

    /* Se você deseja manter o tamanho do seu aplicativo mas renderizá-lo em uma resolução mais baixa, você pode chamar o setSize passando false como updateStyle (o terceiro argumento). Por exemplo, setSize(window.innerWidth/2, window.innerHeight/2, false) irá renderizar sua aplicação na metade da resolução, já que seu elemento <canvas> tem 100% de comprimento e altura. */

    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private adicionarObjeto(): void {
    //Consigo adicionar ao material ainda: textura, reflexão, refração...

    const materialEsfera = {
      cor: '#00ff00',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: true
    }

    const esfera = {
      raio: 1,
      material: materialEsfera
    }

    //const geometry = new THREE.BoxGeometry(cubo.largura, cubo.altura, cubo.profundidade);
    const geometry = new THREE.SphereGeometry(esfera.raio)
    const material = new THREE.MeshBasicMaterial(
      {
        color: esfera.material.cor,
        transparent: esfera.material.transparente,
        opacity: esfera.material.opacidade,
        wireframe: esfera.material.mostrarMalhaDeTriangulos
      }
    );
    const sphere = new THREE.Mesh(geometry, material);
    this.scene.add(sphere);

    this.renderizar()
  }

  @HostListener('mousedown', ['$event'])
  mouseDonw(event) {
    this.mousePressed = true;
  }

  @HostListener('mouseup', ['$event'])
  mouseUp(event) {
    this.mousePressed = false;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    if (this.mousePressed) {
      this.renderizar();
    }
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

}


/* 
  função pra quando a tela for redimensionada
  window.addEventListener('resize', onWindowResize, false)
  function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      render()
  }
*/
