import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {

  }

  public signWithGoogle() {
    this.authService.signWithGoogle();
  }

  public signOut() {
    this.authService.signOut()
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

}
