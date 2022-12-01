import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from "three"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{

  @ViewChild('canvas') private canvasRef: ElementRef;

  rotationSpeedX: number = 0.05;
  rotationSpeedY: number = 0.01;
  size: number = 200;

  cameraZ: number = 400;
  fieldOfView: number = 1;
  nearClippingPlane: number = 1;
  farClippingPlane: number = 1000;

  camera: THREE.PerspectiveCamera;

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  loader = new THREE.TextureLoader();
  geometry = new THREE.BoxGeometry(1, 1, 1);
  material = new THREE.MeshBasicMaterial({color: '#3f7b9d'});

  cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }
  
  private createScene(){
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    this.scene.add(this.cube);

    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio, this.nearClippingPlane, this.farClippingPlane);
    this.camera.position.z = this.cameraZ;
  }

  private getAspectRatio(){
    return this.canvas.clientWidth/this.canvas.clientHeight;
  }

  private animateCube(){
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  private startRenderingLoop(){
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: AppComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      component.renderer.render(component.scene, component.camera);
    }());
  }

}
