// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { ApiServiceService } from '../api-service.service';
// import { UserServiceService } from '../user-service.service';
// import { User } from './user.interface';
 
 
// @Injectable({
//   providedIn: 'root'
// })
// export class UserResolverService implements Resolve<any> {
//   constructor(private userService: UserServiceService) {}
//   resolve(route: ActivatedRouteSnapshot): Observable<any> {
//     console.log('Called Get Product in resolver...', route);

//     return this.userService.logIn().pipe(
//       catchError(error => {
//         return of('No data');
//       })
//     );
//   }
// }
