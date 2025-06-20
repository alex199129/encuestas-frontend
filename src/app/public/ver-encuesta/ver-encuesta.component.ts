import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EncuestaService } from 'src/app/dashboard/services/encuesta.service';

@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html'
})
export class VerEncuestaComponent implements OnInit {
  encuesta: any;
  respuestaForm!: FormGroup;
  slug!: string;

  constructor(
    private route: ActivatedRoute,
    private encuestaService: EncuestaService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')!;
    this.encuestaService.obtenerEncuestaPorSlug(this.slug).subscribe({
      next: (encuesta) => {
        this.encuesta = encuesta;
        this.construirFormulario();
      },
      error: () => {
        this.toastr.error('Error al cargar la encuesta');
      }
    });
  }

  construirFormulario(): void {
    const respuestasFormArray = this.fb.array<FormGroup>([]);

    this.encuesta.preguntas.forEach((pregunta: any) => {
      let grupo: FormGroup;

      if (pregunta.tipo === 'OPCION_MULTIPLE') {
        const checkboxes = pregunta.opciones.map(() => new FormControl(false));
        grupo = this.fb.group({
          valor: this.fb.array(checkboxes)
        });
      } else {
        grupo = this.fb.group({
          valor: ['', Validators.required]
        });
      }

      respuestasFormArray.push(grupo);
    });

    this.respuestaForm = this.fb.group({
      respuestas: respuestasFormArray
    });
  }

  get respuestasFormArray(): FormArray {
    return this.respuestaForm.get('respuestas') as FormArray;
  }

  onSubmit(): void {
    if (this.respuestaForm.invalid) {
      this.toastr.warning('Por favor responde todas las preguntas');
      return;
    }

    const respuestasPayload = this.encuesta.preguntas.map((pregunta: any, index: number) => {
      const control = this.respuestaForm.get('respuestas')!.value[index].valor;

      let valor: any;

      if (pregunta.tipo === 'OPCION_MULTIPLE') {
      const seleccionadas = this.getCheckboxControlArray(index)
        .map((control, j) => control.value ? pregunta.opciones[j].texto : null)
        .filter((texto): texto is string => texto !== null);

        valor = seleccionadas.join(','); 
      } else {
        valor = control;
      }

      return {
        preguntaId: pregunta.id,
        valor
      };
    });

    this.encuestaService.enviarRespuestas(this.slug, { respuestas: respuestasPayload }).subscribe({
      next: () => {
        this.toastr.success('Respuestas enviadas exitosamente');
        this.respuestaForm.reset();
      },
      error: (err) => {
        console.error('Error al enviar respuestas', err);
        this.toastr.error('Error al enviar respuestas');
      }
    });
  }

  getCheckboxControl(preguntaIndex: number, opcionIndex: number): FormControl {
    const formArray = this.respuestasFormArray.at(preguntaIndex).get('valor') as FormArray;
    return formArray.at(opcionIndex) as FormControl;
  }

  getCheckboxControlArray(i: number): FormControl[] {
  const formGroup = this.respuestaForm.get('respuestas') as FormArray;
  const preguntaGroup = formGroup.at(i) as FormGroup;
  const valorArray = preguntaGroup.get('valor') as FormArray;
  return valorArray.controls as FormControl[];
}

}
