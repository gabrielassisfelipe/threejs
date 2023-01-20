import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

@Component({
  selector: 'app-interagir-objeto-three',
  templateUrl: './interagir-objeto-three.component.html',
  styleUrls: ['./interagir-objeto-three.component.scss']
})
export class InteragirObjetoThreeComponent implements AfterViewInit {

  @ViewChild('canvasInteragirObjetoThree') private canvasRef: ElementRef;
  widthCanvas: number = 1600;
  heightCanvas: number = 650;

  camera: THREE.PerspectiveCamera;
  cameraFieldOfView: number = 45;
  cameraNearClippingPlane: number = 1;
  cameraFarClippingPlane: number = 10000;
  cameraPositionZ = 11;

  //controls: OrbitControls;
  dragControls: DragControls;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  rotateObj = -1;

  mousePressed = false

  ngAfterViewInit(): void {
    this.criarCena();
    this.criarTerreno();

    this.criarObjeto(-4, 0.6, 0);
    this.criarObjeto(-2, 0.6, 0);
    this.criarObjeto(0, 0.6, 0);
    this.criarObjeto(2, 0.6, 0);
    this.criarObjeto(4, 0.6, 0);

    this.criarObjeto(-4, -0.7, 2);
    this.criarObjeto(-2, -0.7, 2);
    this.criarObjeto(0, -0.7, 2);
    this.criarObjeto(2, -0.7, 2);
    this.criarObjeto(4, -0.7, 2);

    this.criarObjeto(-4, 1.9, -2);
    this.criarObjeto(-2, 1.9, -2);
    this.criarObjeto(0, 1.9, -2);
    this.criarObjeto(2, 1.9, -2);
    this.criarObjeto(4, 1.9, -2);
  }

  private criarCena(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.canvas.width / this.canvas.height, this.cameraNearClippingPlane, this.cameraFarClippingPlane);
    this.camera.position.z = this.cameraPositionZ;

    //this.controls = new OrbitControls(this.camera, this.canvas);

    this.renderizar();
  }

  private criarTerreno(): void {
    const materialObjeto = {
      cor: '#00ff00',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: false,
      mostrarCorVertice: false
    }


    const geometry = new THREE.PlaneGeometry(10, 10);
    geometry.rotateX(this.rotateObj);

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

  private criarObjeto(x = 0, y = 0, z = 0): void {

    const materialObjeto = {
      cor: '#ff0000',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: false,
      mostrarCorVertice: false
    }


    const geometry = new THREE.BoxGeometry(1, 1, 1);
    geometry.rotateX(this.rotateObj);
    const material = new THREE.MeshBasicMaterial(
      {
        color: materialObjeto.cor,
        transparent: materialObjeto.transparente,
        opacity: materialObjeto.opacidade,
        wireframe: materialObjeto.mostrarMalhaDeTriangulos
      }
    );

    const obj = new THREE.Mesh(geometry, material);
    obj.position.x = x;
    obj.position.y = y;
    obj.position.z = z;

    this.dragControls = new DragControls([obj], this.camera, this.canvas);

    this.scene.add(obj);
    this.renderizar();
  }

  private renderizar(): void {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    this.renderer.render(this.scene, this.camera);
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
