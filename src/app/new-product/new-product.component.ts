import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../services/catalogue.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  constructor(private catServive:CatalogueService) { }

  ngOnInit() {
  }

  onSaveProduct(data: any) {
     console.log(data);
     this.catServive.saveResssouce(this.catServive.host+"/products",data)
       .subscribe(res=>{
         console.log(res);
       },error => {console.log(error);})
  }
}
