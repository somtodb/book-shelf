import { CanActivate, Router, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserAccessGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userData.pipe(
      take(1),
      map(authState => {
        if (authState) {
          this.router.navigate(["/books"]);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
