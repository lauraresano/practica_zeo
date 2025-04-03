import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-usuarios.component.html',
  styleUrl: './login-usuarios.component.css'
})
export class LoginUsuariosComponent {


  usuario = { email: '', password: '' };
  
  errorEmail: string = '';
  errorPassword: string = '';
  errorCredenciales: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  onSubmit() {
    this.errorEmail = '';
    this.errorPassword = '';
    this.errorCredenciales = '';

    // Variable para indicar si los inputs son válidos
    let isValid = true;

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.usuario.email) {
      this.errorEmail = 'Por favor, indique una dirección de correo electrónico.';
      isValid = false; 

    } else if (!emailRegex.test(this.usuario.email)) {
      this.errorEmail = 'La dirección de correo electrónico no tiene un formato válido.';
      isValid = false; 
    }

    // Validar contraseña
    if (!this.usuario.password) {
      this.errorPassword = 'Por favor, ingrese una contraseña';
      isValid = false; // Marcar que la validación ha fallado
    }

    // Si alguna validación falla, no se hace la llamada al backend
    if (!isValid) {
      return;
    }

    // Si pasa las validaciones, llamar al backend
    const loginData = { email: this.usuario.email, password: this.usuario.password };

    // Iniciar sesión (si las credenciales son correctas, se abre lista-usuarios)
    this.usuarioService.login(loginData).subscribe({
      next: (respuesta) => {
        // Si la respuesta es OK, redirige a la lista de usuarios
        if (respuesta.response === "OK") {
          this.router.navigate(['/lista-usuarios']);
        } else {
          this.errorCredenciales = 'Las credenciales ingresadas no son válidas';
        }
      },
      error: (error) => {
        // Si hay un error en la llamada al backend
        this.errorCredenciales =  'Error al intentar autenticar';
      }
    });

  }

}
