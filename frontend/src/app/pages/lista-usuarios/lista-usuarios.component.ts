import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [CommonModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any[] = [];  // Array para almacenar los usuarios

  constructor(private usuarioService: UsuarioService) { }
  
  // Mostrar usuarios automáticamente
  ngOnInit(): void {

    // Llamada al servicio para obtener los usuarios
    this.usuarioService.obtenerUsuarios().subscribe({
      next: (respuesta) => {
        // almacenar lista usuarios
        this.usuarios = respuesta; 
      },
      error: (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
        alert('No se pudieron obtener los usuarios.');
      }
    });
  }
}

