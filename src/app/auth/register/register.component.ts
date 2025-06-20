import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      rol: ['USUARIO', Validators.required]
    }, {
      validators: this.passwordsMatchValidator
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordsMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    const { nombre, email, password, rol } = this.registerForm.value;

    this.authService.register({ nombre, email, password, rol }).subscribe({
      next: () => {
        this.toastr.success('Registro exitoso', 'Éxito');
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.toastr.error('Error al registrar. Verifica los datos.', 'Error');
      }
    });
  }
}
