import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService:AuthentificationService,private router:Router) { }

  ngOnInit() {
  }

  onLogin(dataForm: any) {
    this.authenticationService.login(dataForm.username,dataForm.password);
     if(this.authenticationService.isAuthentificated)
     {
          this.authenticationService.saveAuthentificatedUser();
         this.router.navigateByUrl('');
     }
  }

}
