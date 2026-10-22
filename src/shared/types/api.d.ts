export interface ISuccessResponse<T> {
  status: true;
  code: number;
  payload: T;
}

// One entry per invalid field. The backend sends either `message` (one rule
// failed) or `messages` (several rules failed for the same field) — never
// assume only one of the two is present.
export interface IApiFieldError {
  path: string;
  message?: string;
  messages?: string[];
}

export interface IErrorResponse<R = IApiFieldError> {
  status: false;
  code: number;
  message: string;
  errors: R[];
}

export type IApiResponse<T = unknown, R = IApiFieldError> = ISuccessResponse<T> | IErrorResponse<R>;

// Thrown by the axios interceptor on every failed request. `message` is the
// generic summary ("Validation failed"); `errors` carries the per-field detail.
export interface IApiError extends Error {
  errors?: IApiFieldError[];
}

// The backend sends paginated responses for some endpoints. The `metadata` object
export interface IPaginationMetadata {
 page: number;
      limit: number;
      total: number;
      totalPages: number;
}

// The `data` array contains the actual items for the current page, while the `metadata` object provides information about the pagination state (current page, total pages, etc.).
export interface IPaginatedPayload<T> {
  data: T[];
  metadata: IPaginationMetadata;
}


export interface IEntity {
  id: string;
  immutable: boolean;
  createdAt: string;
  updatedAt: string;
}