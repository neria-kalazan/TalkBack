import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  public isLoggedIn$: Observable<boolean>;
  // public userDetails$: Observable<IUser | undefined>;
  public userDetails: IUser | undefined;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.authService.getUserDetails().subscribe(details => {
      this.userDetails = details;
      console.log('this.userDetails', this.userDetails);
    });


  }

  public signWithGoogle(): void {
    this.authService.signWithGoogle();
  }

  public signOut(): void {
    this.authService.signOut()
  }

  ngOnInit(): void {
   
  }

}
