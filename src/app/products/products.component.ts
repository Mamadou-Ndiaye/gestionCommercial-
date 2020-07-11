import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthentificationService} from '../services/authentification.service';
import {Product} from '../model/product.model';
import {CaddyService} from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  private products;
  private editPhoto: boolean;
  private currentProduct: any;
  private selectedFiles: any;
  private progress: number;
  private currentFileUpload: any;
  private currentTime: number;
  private title :string;
  private  timestamp:number=0;

  constructor(private  catalogueService:CatalogueService,
              private route:ActivatedRoute,
              private  router:Router,
              public  authenticationService:AuthentificationService,
              public caddyService:CaddyService
              ) {

  }

  ngOnInit() {

   console.log(this.route.snapshot.params.p1);

    this.router.events.subscribe(val=>{
      if(val instanceof  NavigationEnd)
      {
        let url=val.url;
        console.log(val);

        let p1=this.route.snapshot.params.p1;

        if(p1==1)
        {
          this.title="Produits Selectionnes";
          this.getProduct("/products/search/selectedProducts ");
        }
        else if(p1==2)
        {
          let idCat=this.route.snapshot.params.p2;
          this.title="Produits de la Categorie "+idCat;
          this.getProduct("/categories/"+idCat+"/products");
        }
        else if(p1==3)
        {
          this.title="Disponible";
          this.getProduct("/products/search/dispoProducts");
        }
        else if(p1==4)
        {
          this.title="Produits en Promo";
          this.getProduct("/products/search/promoProducts");
        }
      }


    });
    let p1=this.route.snapshot.params.p1;

    if(p1==1)
    {
      this.getProduct("/products/search/selectedProducts ");
    }

  }

  private getProduct(url) {
     this.catalogueService.getRessource(url)
       .subscribe(data=>{
         this.products=data;
       },error => {console.log(error)})
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedPhoto(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalogueService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.timestamp=Date.now();
        //this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }

  getTS() {
    return this.timestamp;
  }

  isAdmin() {
     return this.authenticationService.isAdmin();
  }

  onAddProductToCaddy(p:Product) {
      this.caddyService.addProductToCaddy(p);
  }

  onProductDetails(p: Product) {
    let url=btoa(p._links.product.href);
    this.router.navigateByUrl("products-detail/"+url);
  }
}
