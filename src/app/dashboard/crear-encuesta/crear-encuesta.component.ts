import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { EncuestaService } from '../services/encuesta.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crear-encuesta',
  templateUrl: './crear-encuesta.component.html'
})
export class CrearEncuestaComponent {
  encuestaForm: FormGroup;
  modoEdicion = false;
  idEncuesta!: number;

  tiposPregunta = [
    { label: 'Texto corto', value: 'TEXTO_CORTO' },
    { label: 'Párrafo', value: 'PARRAFO' },
    { label: 'Opción múltiple', value: 'OPCION_MULTIPLE' },
    { label: 'Selección única', value: 'SELECCION_UNICA' }
  ];

  constructor(
    private fb: FormBuilder, 
    private encuestaService: EncuestaService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.encuestaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      preguntas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.modoEdicion = true;
      this.idEncuesta = +id;
      this.cargarEncuesta(+id);
    }
  }

  get preguntas(): FormArray {
    return this.encuestaForm.get('preguntas') as FormArray;
  }

  agregarPregunta(): void {
    this.preguntas.push(this.fb.group({
      texto: ['', Validators.required],
      tipo: ['texto', Validators.required],
      opciones: this.fb.array([]) 
    }));
  }

  eliminarPregunta(index: number): void {
    this.preguntas.removeAt(index);
  }

  agregarOpcion(i: number): void {
    const opciones = this.preguntas.at(i).get('opciones') as FormArray;
    opciones.push(this.fb.control('', Validators.required));
  }

  eliminarOpcion(i: number, j: number): void {
    const opciones = this.preguntas.at(i).get('opciones') as FormArray;
    opciones.removeAt(j);
  }

  onSubmit(): void {
    if (this.encuestaForm.invalid) return;

    const encuesta = this.encuestaForm.value;

    const peticion = this.modoEdicion
      ? this.encuestaService.actualizarEncuesta(this.idEncuesta, encuesta)
      : this.encuestaService.crearEncuesta(encuesta);

    peticion.subscribe({
      next: () => {
        const msg = this.modoEdicion ? 'actualizada' : 'creada';
        this.toastr.success(`Encuesta ${msg} exitosamente`);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.toastr.error('Error al guardar la encuesta');
      }
    });
  }


  getOpciones(pregunta: AbstractControl): FormArray {
    return pregunta.get('opciones') as FormArray;
  }

  cargarEncuesta(id: number): void {
    this.encuestaService.obtenerEncuestaPorId(id).subscribe((encuesta: any) => {
      this.encuestaForm.patchValue({
        titulo: encuesta.titulo,
        descripcion: encuesta.descripcion
      });

      const preguntasFormArray = this.encuestaForm.get('preguntas') as FormArray;
      preguntasFormArray.clear();

      encuesta.preguntas.forEach((pregunta: any) => {
        const opciones = pregunta.opciones || [];

        const grupo = this.fb.group({
          texto: [pregunta.texto, Validators.required],
          tipo: [pregunta.tipo, Validators.required],
          opciones: this.fb.array([])
        });

        if (['OPCION_MULTIPLE', 'SELECCION_UNICA'].includes(pregunta.tipo)) {
          const opcionesArray = grupo.get('opciones') as FormArray;
          opciones.forEach((op: string) => {
            opcionesArray.push(this.fb.control(op, Validators.required));
          });
        }

        preguntasFormArray.push(grupo);
      });
    });
  }

}
