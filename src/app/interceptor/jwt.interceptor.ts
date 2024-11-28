import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthServiceService } from '../Auth/auth-service.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthServiceService);
  const token = authService.getToken();
  console.log('JWT Token:', token); 
  if(token)
  {
    const cloneRequest=req.clone({
      setHeaders:{
        Authorization:`Bearer ${token}`
      }
    });
    console.log("interceptor",cloneRequest)
    return next(cloneRequest)
  }
  return next(req);

 
};
