import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

class Circulo {
  posicaoX: number;
  posicaoY: number;
  posicaoRelativaX: number;
  posicaoRelativaY: number;
  cor?: string;
  diametro: number;
  id: number;
  velocidade: number; // m/s
  massa: number;
}

@Component({
  selector: 'app-gravidade',
  templateUrl: './gravidade.component.html',
  styleUrls: ['./gravidade.component.scss']
})
export class GravidadeComponent implements AfterViewInit {

  @ViewChild('canvasGravidade') private canvasRef: ElementRef;
  context: CanvasRenderingContext2D;
  widthCanvasGravidade: number = 1600;
  heightCanvasGravidade: number = 700;
  centerX: number;
  centerY: number;

  numeroCirculos = 300;
  circulos: Circulo[] = [];

  //grandezas
  medidaMetroEmPixel = 100; //pixel

  constructor() { }

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.criarCirculos();
    this.atualizarPosicao();
  }

  private setupCanvas(): void {
    this.context = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;
  }

  private criarCirculos(): void {
    for (let i = 0; i < this.numeroCirculos; i++) {
      const tamanho = this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(5, 10)
      this.circulos.push(
        {
          posicaoX: this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(tamanho / 2, this.canvas.width - tamanho / 2),
          posicaoY: this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(tamanho / 2, this.canvas.height - tamanho / 2),
          posicaoRelativaX: this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(tamanho / 2, this.canvas.width - tamanho / 2),
          posicaoRelativaY: this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(tamanho / 2, this.canvas.height - tamanho / 2),
          diametro: tamanho,
          massa: tamanho,
          cor: this.gerarCor(),
          velocidade: 0,
          id: i
        }
      );
    }
  }

  private desenharCirculo(circulo: Circulo): void {
    this.context.beginPath();
    this.context.arc(circulo.posicaoX, circulo.posicaoY, circulo.diametro / 2, 0, 2 * Math.PI);
    this.context.fillStyle = circulo.cor;
    this.context.fill();
    this.context.stroke();
  }

  private movimentoCirculos(circulo: Circulo, timeGap: number): Circulo {
    /*  
      Força Gravitacional (m/s²):
      F = (G*M)/raio**2
      G = constante gravitacional: 6,6743 × 10-11  m3/kg.s² 

      F = M.a
      a = F/M m/s²

      *Considerando que 100px tem 1 metro 
      *Considerando que 10px tem 1 quilo
      
      Posição:
      S = S0  + V0*t + (a.(t**2))/2
      
      Força de Arrasto 
      Fd = 0,5*p*v²*Cd*A
    */

    /*
      for (let i = 0; i < this.circulos.length; i++) {
        if (this.circulos[i].id != circulo.id) {
          const distanciaDoisPontos = Math.sqrt(((this.circulos[i].posicaoX - circulo.posicaoX) ** 2) + ((this.circulos[i].posicaoY - circulo.posicaoY) ** 2));
          if (distanciaDoisPontos <= (this.circulos[i].diametro / 2 + circulo.diametro / 2)) {
            console.log('encostou');
          }
        }
      } 
    */

    const constanteGravitacional = (6.6743 * (10 ** -11));  // m³/kg*s²
    const massaTerra = 5.9742 * (10 ** 24); //kg
    const raioTerra = 6378100;  //m
    //const forcaGravidade = constanteGravitacional * ((massaTerra * circulo.massa) / ((raioTerra + this.transformarPixelEmMetros(circulo.posicaoRelativaY)) ** 2));  //N
    const forcaGravidadeTerra = constanteGravitacional * ((massaTerra) / ((raioTerra) ** 2));  //N

    const forcaPeso = circulo.massa * forcaGravidadeTerra
    

    const densidadeDoAr = 1.2754;  // kg/m³
    const coeficienteDeArrasto = 0.47;
    const areaCorteTransversal = Math.PI * ((this.transformarPixelEmMetros(circulo.diametro) / 2) ** 2)
    const forcaArrasto = 0.5 * densidadeDoAr * (circulo.velocidade ** 2) * coeficienteDeArrasto * areaCorteTransversal;
          
    const aceleracao = (forcaPeso - forcaArrasto) / circulo.massa;

    circulo.posicaoRelativaY = this.transformarMetrosEmPixel(this.transformarPixelEmMetros(circulo.posicaoRelativaY) + (circulo.velocidade * 0.001) + ((aceleracao * ((0.001) ** 2)) / 2));

    if (this.transformarMetrosEmPixel(this.transformarPixelEmMetros(circulo.posicaoY) + (circulo.velocidade * 0.001) + ((aceleracao * ((0.001) ** 2)) / 2)) >= this.canvas.height) {
      circulo.posicaoY = 0;
    } else {
      circulo.posicaoY = this.transformarMetrosEmPixel(this.transformarPixelEmMetros(circulo.posicaoY) + (circulo.velocidade * 0.001) + ((aceleracao * ((0.001) ** 2)) / 2));
    }

    circulo.velocidade += (aceleracao * timeGap / 1000);
    return circulo;
  }

  private atualizarPosicao(): void {
    let time = Date.now();

    setInterval(() => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      const currentTime = Date.now();
      const timeGap = currentTime - time;
      time = currentTime;

      this.circulos.forEach(item => {
        this.movimentoCirculos(item, timeGap);
        this.desenharCirculo(item);
      })
    }, 1)
  }

  private transformarPixelEmMetros(distanciaEmPixel: number): number {
    return distanciaEmPixel / this.medidaMetroEmPixel;
  }

  private transformarMetrosEmPixel(distanciaEmMetros: number): number {
    return distanciaEmMetros * this.medidaMetroEmPixel;
  }

  private transformarVelocidadeEmPixelPorMilissegundos(velocidadeEmMetroPorSegundo: number): number {
    return velocidadeEmMetroPorSegundo * this.medidaMetroEmPixel / 1000;
  }

  private transformarAceleracaoEmPixelPorMilissegundos(aceleracaoEmMetroPorSegundo: number): number {
    return aceleracaoEmMetroPorSegundo * this.medidaMetroEmPixel / (1000 ** 2);
  }

  private gerarCor(): string {
    const arrayCor = ["red", "green", "blue", "black", "pink", "yellow", "brown"];
    return arrayCor[this.gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(0, arrayCor.length)];
  }

  private gerarNumeroInteiroAleatorioDentroDeUmIntervaloDeterminado(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

}
