import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-montar-blocos-three',
  templateUrl: './montar-blocos-three.component.html',
  styleUrls: ['./montar-blocos-three.component.scss']
})
export class MontarBlocosThreeComponent implements AfterViewInit {

  @ViewChild('canvasMontarBlocosThree') private canvasRef: ElementRef;
  widthCanvas: number = 1600;
  heightCanvas: number = 650;

  camera: THREE.PerspectiveCamera;
  cameraFieldOfView: number = 45;
  cameraNearClippingPlane: number = 1;
  cameraFarClippingPlane: number = 10000;
  cameraPositionZ = 11;

  controls: OrbitControls;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  intersects;

  objetosCena = {
    terreno: [],
    blocos: []
  }



  ngAfterViewInit(): void {
    this.criarCena();
    this.criarTerreno();
    this.startRenderingLoop();
  }

  private criarCena(): void {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);
    const axesHelper = new THREE.AxesHelper(15);
    //x: vermelho
    //y: verde
    //z: azul
    axesHelper.setColors(new THREE.Color(0xff0000), new THREE.Color(0x00ff00), new THREE.Color(0x0000ff));
    this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(this.cameraFieldOfView, this.canvas.width / this.canvas.height, this.cameraNearClippingPlane, this.cameraFarClippingPlane);
    this.camera.position.set(10, 8, 10);
    this.camera.lookAt(0, 0, 0)

    this.scene.add(this.camera)

    //this.controls = new OrbitControls(this.camera, this.canvas);
  }

  private criarTerreno(): void {
    const tamanhoTerrenoX = 10;
    const tamanhoTerrenoZ = 10;

    const materialObjeto = {
      cor: '#00ff00',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: true,
      mostrarCorVertice: false
    }


    const geometry = new THREE.PlaneGeometry(1, 1);

    for (let x = 1; x <= tamanhoTerrenoX; x++) {
      for (let z = 1; z <= tamanhoTerrenoZ; z++) {
        const material = new THREE.MeshBasicMaterial(
          {
            color: materialObjeto.cor,
            transparent: materialObjeto.transparente,
            opacity: materialObjeto.opacidade,
            wireframe: materialObjeto.mostrarMalhaDeTriangulos
          }
        );

        const obj = new THREE.Mesh(geometry, material);
        obj.rotateX(-1.5708);
        obj.position.set(x - tamanhoTerrenoX / 2 - 0.5, 0, z - tamanhoTerrenoZ / 2 - 0.5);
        this.objetosCena.terreno.push(obj);
        this.scene.add(obj);
      }
    }
  }

  private criarObjeto(x: number, y: number, z: number): THREE.Mesh {

    const materialObjeto = {
      cor: '#ff0000',
      transparente: false,
      opacidade: 0.5,
      mostrarMalhaDeTriangulos: false,
      mostrarCorVertice: false
    }


    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const material = new THREE.MeshBasicMaterial(
      {
        color: materialObjeto.cor,
        transparent: materialObjeto.transparente,
        opacity: materialObjeto.opacidade,
        wireframe: materialObjeto.mostrarMalhaDeTriangulos,
        vertexColors: materialObjeto.mostrarCorVertice,
        map: new THREE.TextureLoader().load('../../assets/square-outline-textured.png')
      }
    );

    const obj = new THREE.Mesh(geometry, material);
    obj.position.x = x;
    obj.position.y = y;
    obj.position.z = z;

    return obj;
  }

  private renderizar(): void {
    if (!this.renderer) {
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
      this.renderer.setSize(this.canvas.width, this.canvas.height);
    }

    this.renderer.render(this.scene, this.camera);
  }

  private startRenderingLoop() {
    let component: MontarBlocosThreeComponent = this;
    (function animate() {
      requestAnimationFrame(animate);
      component.animateKey();
      component.renderizar();
    }());
  }

  private animateKey() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    this.intersects = this.raycaster.intersectObjects([...this.objetosCena.terreno, ...this.objetosCena.blocos]);
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(event) {
    if (this.intersects && this.intersects.length > 0 && event.button === 0) {
      /* if(this.intersects[0].object){
        console.log(this.intersects[0].object.geometry.type != "PlaneGeometry");
        
      } */

      const salto = 0.5;

      const pointX = this.intersects[0].point.x;
      const pointY = this.intersects[0].point.y;
      const pointZ = this.intersects[0].point.z;

      const cordX = Math.round(pointX / salto) * salto
      const cordY = Math.round(pointY / salto) * salto
      const cordZ = Math.round(pointZ / salto) * salto



      /* console.log(`X: ${Math.ceil(pointX / salto) } | Y: ${Math.ceil(pointY / salto)} | Z: ${Math.ceil(pointZ / salto)}`);
      console.log(`X: ${Math.round(pointX / salto) } | Y: ${Math.round(pointY / salto)} | Z: ${Math.round(pointZ / salto)}`);
      console.log(`X: ${Math.floor(pointX / salto) } | Y: ${Math.floor(pointY / salto)} | Z: ${Math.floor(pointZ / salto)}`);
      console.log(`X: ${pointX} | Y: ${pointY} | Z: ${pointZ}`);
      console.log(`X: ${cordX} | Y: ${cordY} | Z: ${cordZ}`);
      console.log(`-----------------------------------------------------------------------------------------------------------`); */

      const novoBloco = this.criarObjeto(cordX, cordY+0.5, cordZ);
      //const novoBloco = this.criarObjeto(0, 0, 0);
      this.scene.add(novoBloco);
      this.objetosCena.blocos.push(novoBloco)
    }


    /* if (this.intersects && this.intersects.length > 0) {
      const posicao = this.intersects[0].object.position;

      let objetoMesmaPosicao = this.objetosCena.blocos.find(item => {
        if (item.position.x === posicao.x && item.position.y === posicao.y + 1 && item.position.z === posicao.z) {
          return item;
        }
      });

      if (objetoMesmaPosicao != undefined || Number.isInteger((posicao.y + 1))) {
        if (posicao.y > 0) {
          return;
        }
      }

      let addY = this.intersects.length > 1 ? 1 : 0.5
      const novoBloco = this.criarObjeto(posicao.x, posicao.y + addY, posicao.z);
      this.scene.add(novoBloco);
      this.objetosCena.blocos.push(novoBloco);
    } */
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event) {

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

    //console.log(`${this.pointer.x}, ${this.pointer.y} || ${event.clientX}, ${event.clientY}`)
    //console.log('---------------------------------')

    if (this.intersects && this.intersects.length > 0){
      this.intersects[0].object.material.color.set(0xff0000)
    }
  }


}