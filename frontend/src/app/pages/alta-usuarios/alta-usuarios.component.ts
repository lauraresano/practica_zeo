import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alta-usuarios',
  imports: [FormsModule, CommonModule],
  templateUrl: './alta-usuarios.component.html',
  styleUrl: './alta-usuarios.component.css'
})
export class AltaUsuariosComponent {

  usuario = {
    nombre: '',
    edad: null,
    email: '',
    password: ''
  };

  successRegistro: string = '';
  errorRegistro : string = '';
  errorCampos: string = '';

  constructor(private usuarioService: UsuarioService) {}

  // Se ejecuta al guardar usuario nuevo
  onSubmit() {
    this.successRegistro = '';
    this.errorRegistro = '';


    // Validar que todos los campos tengan valor
    if (!this.usuario.nombre || !this.usuario.edad || !this.usuario.email || !this.usuario.password) {
      this.errorCampos = 'Por favor, complete todos los campos.';
      return; // Detener la ejecución si algún campo está vacío
    }

    this.errorCampos = '';
    // Registrar el usuario
    this.usuarioService.registrarUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        if (respuesta.response === "OK") {

          this.usuario = { nombre: '', edad: null, email: '', password: '' }; // Limpiar el formulario
          this.successRegistro = 'Usuario registrado correctamente';
          

        } else {

          this.errorRegistro = 'Las credenciales ingresadas no son válidas';
        }
        
      },
      error: (error) => {
        this.errorRegistro  = 'Error al registrar usuario';
        console.error('Error:', error);  
      }
    });
  }
}
