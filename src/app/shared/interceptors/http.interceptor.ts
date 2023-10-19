import { HttpInterceptorFn } from '@angular/common/http';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/api/') && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer 1|wKxSEJBc52wq32C9vHZbqU29LrzPTpoqY3UFBOIUcfeefb4a`,
      },
    });
  }
  return next(req);
};
