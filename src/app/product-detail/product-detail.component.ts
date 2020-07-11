import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthentificationService} from '../services/authentification.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  private  currentProduct;
  mode: number=0;
  private editPhoto: boolean;
  selectedFiles;
  private progress: number;
  private currentTime: number;
  currentFileUpload;
  constructor(private router:Router,
              private route:ActivatedRoute,
              private  catalogueService:CatalogueService,
              public authenticationService:AuthentificationService ) { }

  ngOnInit() {
    let url=atob(this.route.snapshot.params.url);
    console.log(url);
     this.catalogueService.getProductt(url)
       .subscribe(data=>{
         this.currentProduct=data;
      })
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
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
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }



  getTS() {
    return this.currentTime;
  }


  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catalogueService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

}
