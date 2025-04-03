import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios'; // URL del backend

  constructor(private http: HttpClient) {}

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registrar`, usuario);
  }

  // Obtener lista de usuarios
  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lista`);
  }


  login(usuario: any): Observable< any> {
    return this.http.post<any >(`${this.apiUrl}/login`, usuario);
  }

}

