import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, lastValueFrom } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';


export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  return from(handle(req, next))
};


const handle = async (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const storage = inject(StorageService);

  const token = await storage.get('auth-token');

  if (req.url.includes('/api/') && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return await lastValueFrom(next(req));
}
