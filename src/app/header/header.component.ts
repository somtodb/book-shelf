import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  navbarOpen = false;
  isAuthenticated = false;
  private sub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.sub = this.authService.userData.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
