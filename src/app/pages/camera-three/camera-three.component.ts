import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

@Component({
  selector: 'app-camera-three',
  templateUrl: './camera-three.component.html',
  styleUrls: ['./camera-three.component.scss']
})
export class CameraThreeComponent implements AfterViewInit {

  @ViewChild('canvasCameraThree') private canvasRef: ElementRef;
  widthCanvas: number = 1600;
  heightCanvas: number = 700;

  camera: THREE.PerspectiveCamera;
  cameraFieldOfView: number = 45;
  cameraNearClippingPlane: number = 0.1;
  cameraFarClippingPlane: number = 1000;
  cameraPositionZ = 5;

  controls: OrbitControls;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  // movimento
  keydown = [];
  mousePressed = false;

  constructor() { }

  ngAfterViewInit(): void {
    this.criarCena();
    this.adicionarObjeto();
    this.renderizar()
    this.startLoop()
  }

  private criarCena(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(new THREE.AxesHelper(5000));

    this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.canvas.width / this.canvas.height, this.cameraNearClippingPlane, this.cameraFarClippingPlane);
    this.camera.position.z = this.cameraPositionZ;

    this.controls = new OrbitControls(this.camera, this.canvas);

    const noventaGraus = 1.57;

    this.controls.minPolarAngle = noventaGraus-0.3;    
    this.controls.maxPolarAngle = noventaGraus-0.3;

    this.controls.minAzimuthAngle = 0;
    this.controls.maxAzimuthAngle = noventaGraus;
  }

  private renderizar(): void {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }
    this.renderer.render(this.scene, this.camera);
  }


  private adicionarObjeto(): void {
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
  }

  private animateKey() {
    //noventa graus = 1,57
    const azimute = this.controls.getAzimuthalAngle();  
    
    
    if (this.keydown["ArrowUp"] || this.keydown["KeyW"]) {
      this.camera.position.z -= 0.1;
    }
    if (this.keydown["ArrowDown"] || this.keydown["KeyS"]) {
      this.camera.position.z += 0.1;
    }
    if (this.keydown["ArrowRight"] || this.keydown["KeyD"]) {
      this.camera.position.x += 0.1;
    }
    if (this.keydown["ArrowLeft"] || this.keydown["KeyA"]) {
      this.camera.position.x -= 0.1;
    }
  }

  private startLoop() {
    let component: CameraThreeComponent = this;
    (function animate() {
      requestAnimationFrame(animate);
      component.animateKey();
      component.renderizar()
    }());
  }

  @HostListener('window:keydown', ['$event.code'])
  onWindowKeyDown(key) {
    this.keydown[key] = true;
  }

  @HostListener('window:keyup', ['$event.code'])
  onWindowKeyUp(key) {
    this.keydown[key] = false;
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
