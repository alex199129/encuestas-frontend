import { Component, OnInit } from '@angular/core';
import { EncuestaService, Encuesta } from '../services/encuesta.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  encuestas: Encuesta[] = [];

  constructor(
    private encuestaService: EncuestaService,
    private router: Router,
    private toastr: ToastrService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.cargarEncuestas();
  }

  cargarEncuestas(): void {
    this.encuestaService.obtenerEncuestas().subscribe(data => {
      this.encuestas = data;
    });
  }

  editarEncuesta(id: number): void {
    this.encuestaService.tieneRespuestas(id).subscribe((tiene) => {
      if (tiene) {
        this.toastr.warning('No se puede editar esta encuesta porque ya tiene respuestas.');
      } else {
        this.router.navigate(['/dashboard/editar', id]);
      }
    });
  }


  eliminarEncuesta(id: number): void {
    this.encuestaService.tieneRespuestas(id).subscribe((tiene) => {
      if (tiene) {
        if (confirm('Esta encuesta porque ya tiene respuestas ¿Está seguro de eliminar esta encuesta?')) {
          this.encuestaService.eliminarEncuesta(id).subscribe(() => {
            this.toastr.success('Encuesta eliminada exitosamente');
            this.cargarEncuestas();
          });
        }
      } else {
        if (confirm('¿Está seguro de eliminar esta encuesta?')) {
          this.encuestaService.eliminarEncuesta(id).subscribe(() => {
            this.toastr.success('Encuesta eliminada exitosamente');
            this.cargarEncuestas();
          });
        }
      }
    });
  }


  verResultados(id: number): void {
    this.router.navigate(['/dashboard/resultados', id]);
  }

  copiarLinkPublico(slug: string): void {
    const url = `${window.location.origin}/encuesta/${slug}`;
    this.clipboard.copy(url);
    alert('🔗 Link copiado al portapapeles:\n' + url);
  }

}
