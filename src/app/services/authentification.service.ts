import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

    private  users=[
      {username:'admin',password:'1234',roles:['ADMIN','USER']},
      {username:'user1',password:'1234',roles:['USER']},
      {username:'user2',password:'1234',roles:['USER']},
    ];
    public  isAuthentificated:boolean;
    public userAuthenticated;
    public  token ; //les infos de l'utilisateur
  constructor() { }

  public  login(username:string,password:string)
  {
    let user=undefined;
    this.users.forEach(u=>{
      if(u.username==username && u.password==password)
      {
        user=u;
       // this.token={username:u.username,roles:u.roles};
               this.token=btoa(JSON.stringify({username:u.username,roles:u.roles}) )
      }
      if(user)
      {
        this.isAuthentificated=true;
        this.userAuthenticated=user;
      }
      else {
        this.isAuthentificated=false;
        this.userAuthenticated=undefined;
      }
    })
  }

  public  isAdmin(){
    if (this.userAuthenticated)
    {
      if(this.userAuthenticated.roles.indexOf('ADMIN')>-1){
         return true;
      }
      return  false;
    }
  }
   //Pour que l'utilisateur ne log pas une fois connecter
  public  saveAuthentificatedUser(){
    if (this.userAuthenticated)
    {
      //on en registre en local storage
      localStorage.setItem('authToken',this.token);
    }
  }

  public  loadUserAuthentificatedFromLocalStorage()
  {
    let t=localStorage.getItem('authToken');
     if (t)
     {
       let  user=JSON.parse(atob(t));
       this.userAuthenticated={username:user.userAuthenticated,roles:user.roles};
      console.log(this.userAuthenticated)
       this.isAuthentificated=true;
       this.token=t;
     }

  }
  public  removeTokenLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthentificated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
  }
}
