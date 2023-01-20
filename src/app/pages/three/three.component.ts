import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import * as THREE from "three"

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef: ElementRef;
  widthThree: number = 1600;
  heightThree: number = 700;

  //Animação do cubo rodando
  rotationSpeedX: number = 0.01;
  rotationSpeedY: number = 0.01;
  size: number = 200;

  //Andar pelo cubo
  keydown = [];
  pulando: boolean = false;
  pulo: number = 0.3;
  gravidade: number = 0.03;

  cameraZ: number = 5;
  fieldOfView: number = 45;
  nearClippingPlane: number = 0.1;
  farClippingPlane: number = 1000;


  numeroDeCubos = 50;
  arrayCubos = [];
  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshBasicMaterial({ color: '#3f7b9d' });
  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  camera: THREE.PerspectiveCamera;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  controls: any;

  ngAfterViewInit(): void {
    this.criarArrayCubos();
    this.createScene();
    this.startRenderingLoop();
  }

  private criarArrayCubos() {
    for (let i = 0; i < this.numeroDeCubos; i++) {
      this.arrayCubos[i] = {
        cube: new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ color: '#3f7b9d' }))
      }
    }
  }

  private listToMatrix(list, elementsPerSubArray): any[] {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
      if (i % elementsPerSubArray === 0) {
        k++;
        matrix[k] = [];
      }

      matrix[k].push(list[i]);
    }

    return matrix;
  }

  private createScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    this.listToMatrix(this.arrayCubos, Math.ceil(Math.sqrt(this.arrayCubos.length))).forEach((itemZ, indexZ) => {
      itemZ.forEach((itemX, indexX) => {
        this.scene.add(itemX.cube);
        itemX.cube.position.z = -indexZ * 3
        itemX.cube.position.x = -indexX * 3
      })
    });

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio, this.nearClippingPlane, this.farClippingPlane);
    this.camera.position.z = this.cameraZ;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: ThreeComponent = this;
    (function animate() {
      requestAnimationFrame(animate);
      component.animateKey();
      component.renderizar()
    }());
  }

  private renderizar() {
    this.renderer.render(this.scene, this.camera);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  //Animação do cubo rodando
  private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private animateKey() {

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

    if (this.keydown["Space"] && !this.pulando) {
      this.pulando = true;
    }

    if (this.pulando) {
      this.camera.position.y += this.pulo;
      if (this.camera.position.y >= 0) {
        this.pulo -= this.gravidade;
      } else {
        this.camera.position.y = 0;
        this.pulo = 0.3;
        this.pulando = false;
      }
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {
    console.log('X:' + event.clientX + ', ' + '  Y: ' + event.clientY);
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
