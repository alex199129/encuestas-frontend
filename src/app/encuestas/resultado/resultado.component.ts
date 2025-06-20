import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaResultadoDTO } from './encuesta-resultado.model';
import { EncuestaService } from 'src/app/dashboard/services/encuesta.service';


@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html'
})
export class ResultadoComponent implements OnInit {
  resultado?: EncuestaResultadoDTO;

  constructor(
    private encuestaService: EncuestaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.encuestaService.obtenerResultados(id).subscribe(res => {
      this.resultado = res;
    });
  }
}
