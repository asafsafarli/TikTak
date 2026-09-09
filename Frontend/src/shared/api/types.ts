// Backend bütün cavabları eyni zərfə (envelope) sarır.
export interface ApiEnvelope<T> {
  message: string;
  data: T;
  result: boolean;
}
