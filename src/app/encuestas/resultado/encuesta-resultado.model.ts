export interface EncuestaResultadoDTO {
  encuestaId: number;
  titulo: string;
  preguntas: PreguntaResultadoDTO[];
}

export interface PreguntaResultadoDTO {
  id: number;
  texto: string;
  tipo: string;
  respuestas: RespuestaEstadisticaDTO[];
}

export interface RespuestaEstadisticaDTO {
  valor: string;
  cantidad?: number;
}
