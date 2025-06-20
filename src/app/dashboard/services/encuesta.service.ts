import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EncuestaResultadoDTO } from 'src/app/encuestas/resultado/encuesta-resultado.model';

export interface Encuesta {
  id: number;
  titulo: string;
  descripcion: string;
  slug: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  private apiUrl = 'http://localhost:8080/api/encuestas';

  constructor(private http: HttpClient) {}

  obtenerEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiUrl);
  }

  obtenerEncuestaPorId(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearEncuesta(encuesta: any) {
    return this.http.post(this.apiUrl, encuesta);
  }

  actualizarEncuesta(id: number, encuesta: any) {
    return this.http.put(`${this.apiUrl}/${id}`, encuesta);
  }

  eliminarEncuesta(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  tieneRespuestas(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/${id}/tiene-respuestas`);
  }

  obtenerResultados(id: number): Observable<EncuestaResultadoDTO> {
    return this.http.get<EncuestaResultadoDTO>(`${this.apiUrl}/${id}/resultados`);
  }

  obtenerEncuestaPorSlug(slug: string): Observable<any> {
    return this.http.get(`http://localhost:8080/api/public/encuestas/${slug}`);
  }

  enviarRespuestas(slug: string, payload: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/public/encuestas/${slug}/responder`, payload);
  }

}




