import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatalogueService} from '../services/catalogue.service';
import {Product} from '../model/product.model';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  public produits: any;
  public  size:number=5;
  public  currentPage:number=0;
  public  totalPages:number;
  public  pages:Array<number>;
  // on fait l'injection de dependance
  public currentKeyword: string;
  public mode: number=2;
  constructor(public catService: CatalogueService) { }

  ngOnInit() {
  }

  onGetProducts() {
    /* On envoie une requete httpclient*/
    this.catService.getProduct(this.currentPage,this.size)
    .subscribe(data => {

        this.totalPages=data["page"].totalPages;
        this.pages=new  Array<number>(this.totalPages);
        this.produits = data;
      }, err => {console.log(err); });
    }

  onPageProduct(i: number) {
    this.currentPage=i;
    this.chercherProduit();
  }
  onChercher(form: any) {
    console.log(form);
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherProduit();

  }

  chercherProduit() {

    this.catService.getProductbyKeyword(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data => {
        this.totalPages=data["page"].totalPages;
        this.pages=new  Array<number>(this.totalPages);
        this.produits = data;
      }, err => {console.log(err); });

  }

  onDeleteProduct(p) {
    let  conf=confirm("Etes vous sure ?");
    if(conf)
    {
      console.log(p);
      this.catService.deleteResssouce(p._links.self.href)
        .subscribe(data=>{
          this.chercherProduit()
        },error => {
          console.log(error);
        });

    }

  }


  onUpdateProduct(p: Product) {
    console.log(p);
    this.catService.updateResssouce(p._links.self.href,p)
      .subscribe(data=>{
        this.chercherProduit()
        this.mode=1;
      },error => {
        console.log(error);
      });

  }
}
