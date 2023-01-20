import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export class Objeto {
  largura: number;
  altura: number;
  profundidade: number;
  textura: string;
}

@Component({
  selector: 'app-criar-objetos-three',
  templateUrl: './criar-objetos-three.component.html',
  styleUrls: ['./criar-objetos-three.component.scss']
})
export class CriarObjetosThreeComponent implements AfterViewInit {

  @ViewChild('canvasCriarObjetoThree') private canvasRef: ElementRef;
  widthCanvas: number = 1600;
  heightCanvas: number = 650;

  camera: THREE.PerspectiveCamera;
  cameraFieldOfView: number = 45;
  cameraNearClippingPlane: number = 0.01;
  cameraFarClippingPlane: number = 1000;
  cameraPositionZ = 5;

  controls: OrbitControls;
  mousePressed = false;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  form: FormGroup;
  objeto: Objeto = new Objeto();

  constructor() {
    this.criarFormulario();
  }

  ngAfterViewInit(): void {
    this.criarCena();
  }

  private criarFormulario(): void {
    this.form = new FormGroup({
      'largura': new FormControl(this.objeto.largura, [Validators.required]),
      'altura': new FormControl(this.objeto.altura, [Validators.required]),
      'profundidade': new FormControl(this.objeto.profundidade, [Validators.required]),
      'textura': new FormControl(this.objeto.textura),
    });
  }

  private criarCena(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.canvas.width / this.canvas.height, this.cameraNearClippingPlane, this.cameraFarClippingPlane);

    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enablePan = false

    this.renderizar();
  }

  private renderizar(): void {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    this.renderer.render(this.scene, this.camera);
  }

  criarObjeto(objeto: Objeto): void {
    if(this.scene.children.length > 0){
      this.scene.remove(this.scene.children[0])
    }
    
    const materialObjeto = {
      cor: '#00ff00',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: true,
      mostrarCorVertice: false
    }

    this.camera.position.z = this.cameraPositionZ

    const geometry = new THREE.BoxGeometry(objeto.largura/100, objeto.altura/100, objeto.profundidade/100)
    const material = new THREE.MeshBasicMaterial(
      {
        color: materialObjeto.cor,
        transparent: materialObjeto.transparente,
        opacity: materialObjeto.opacidade,
        wireframe: materialObjeto.mostrarMalhaDeTriangulos
      }
    );    

    const obj = new THREE.Mesh(geometry, material);
    this.scene.add(obj);
    this.renderizar();
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