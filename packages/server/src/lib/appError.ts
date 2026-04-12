export const ERROR_CODE = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  CONFLICT: 'CONFLICT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL: 'INTERNAL_ERROR',
} as const;

// * Derive the type from the values — a union of the literal strings
export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

const STATUS_MAP = new Map<ErrorCode, number>([
  [ERROR_CODE.NOT_FOUND, 404],
  [ERROR_CODE.VALIDATION_ERROR, 422],
  [ERROR_CODE.CONFLICT, 409],
  [ERROR_CODE.UNAUTHORIZED, 401],
  [ERROR_CODE.FORBIDDEN, 403],
  [ERROR_CODE.INTERNAL, 500],
]);

export function createAppError(code: ErrorCode, message: string): Error {
  const err = new Error(message) as Error & {
    statusCode: number;
    code: ErrorCode;
  };
  err.statusCode = STATUS_MAP.get(code) ?? 500;
  err.code = code;
  return err;
}
