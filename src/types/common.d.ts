export type ErrorResponse = {
  /**Код ошибки */
  errorCode?: string | number

  /** Описание ошибки на языке, переданном в параметре language в запросе. */
  errorMessage?: string
}

export interface Language {
  language?: string
}
