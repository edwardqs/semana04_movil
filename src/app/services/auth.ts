import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL base de tu API
  private baseUrl = "http://localhost:8000/api";

  constructor(private http: HttpClient) { }
  
  // Método de login mejorado
  public login(credentials: {email: string, password: string}) {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  // Nuevo método para registrar usuarios
  public register(userData: {email: string, password: string}) {
    return this.http.post<any>(`${this.baseUrl}/register`, userData);
  }
}