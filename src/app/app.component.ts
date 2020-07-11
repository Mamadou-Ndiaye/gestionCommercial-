import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './services/catalogue.service';
import {Router} from '@angular/router';
import {AuthentificationService} from './services/authentification.service';
import {CaddyService} from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{

  texte:string;
  mesProduits:any
 /* info={nom:"Ndiaye",
        prenom:"Mamadou",
        Email:"ndiamamadou@gmail.com",
        telephone:774016666,


       }*/
  private categories;
  private currentCategory;
  constructor(private  catService:CatalogueService,
              private  router:Router,
              private authenticationService:AuthentificationService,
              public  caddyService:CaddyService)
  {

  }
  title = 'gestionCommercial';

  ngOnInit(): void {
    this.authenticationService.loadUserAuthentificatedFromLocalStorage();
    this.getCategories();
  }

  private getCategories() {
     this.catService.getRessource("/categories")
       .subscribe(data=>{
         this.categories=data;
       })
  }

  getProductsByCat(c) {
    this.currentCategory=c;
     this.router.navigateByUrl("/products/2/"+c.id);
  }

  onSelectedProduct() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/1/0");
  }
  onProductsDisponible() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsPromo() {
    this.currentCategory=undefined;
    this.router.navigateByUrl("/products/4/0");
  }


  onLogout() {
    this.authenticationService.removeTokenLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
