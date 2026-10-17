import { HttpInterceptorFn } from '@angular/common/http';

export const applicationInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
