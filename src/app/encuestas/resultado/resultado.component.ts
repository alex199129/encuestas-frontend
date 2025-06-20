import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChartType, ChartOptions, ChartData } from 'chart.js';
import { EncuestaService } from 'src/app/dashboard/services/encuesta.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  resultado: any;
  chartDataList: { chartData: ChartData<'bar'>, preguntaId: number }[] = [];
  barChartOptions: ChartOptions = { responsive: true };
  barChartType: ChartType = 'bar';

  constructor(
    private route: ActivatedRoute,
    private resultadoService: EncuestaService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarResultados(id);

    interval(10000)
      .pipe(switchMap(() => this.resultadoService.obtenerResultados(id)))
      .subscribe(data => {
        this.resultado = data;
        this.generarGraficas();
      });
  }

  cargarResultados(id: number): void {
    this.resultadoService.obtenerResultados(id).subscribe(data => {
      this.resultado = data;
      this.generarGraficas();
    });
  }

  generarGraficas(): void {
    this.chartDataList = [];
    this.resultado.preguntas.forEach((p: any) => {
      if (p.tipo !== 'PARRAFO' && p.tipo !== 'TEXTO_CORTO') {
        const labels = p.respuestas.map((r: any) => r.valor);
        const data = p.respuestas.map((r: any) => r.cantidad);
        this.chartDataList.push({
          preguntaId: p.id,
          chartData: {
            labels,
            datasets: [{
              data,
              label: p.texto,
              backgroundColor: 'rgba(63, 81, 181, 0.6)'
            }]
          }
        });
      }
    });
  }

  getChartData(preguntaId: number): ChartData<'bar'> | undefined {
    return this.chartDataList.find(c => c.preguntaId === preguntaId)?.chartData;
  }

  volverAlDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
