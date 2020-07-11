import { Injectable } from '@angular/core';
import {Caddy} from '../model/caddy.model';
import {Product} from '../model/product.model';
import {ProductItem} from '../model/product-Item.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {

  currentCaddyName:string='Caddy1';
  //on gere une liste de panier
  public  caddies:Map<string,Caddy>=new Map();

  constructor() {
    let caddies=localStorage.getItem('myCaddies');
    if(caddies)
    {
      this.caddies=JSON.parse(caddies);
    }
    else {
      let caddy=new Caddy(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName,caddy);
    }

  }
  public addProductToCaddy(product:Product)
  {
       let caddy=this.caddies.get(this.currentCaddyName);
       let  productItem:ProductItem=caddy.items.get(product.id);
       //Si le produit  est dans le panier(caddy) on ajoute la quantite a la quantite  actuelle
       if(productItem){
         productItem.quantity+=product.quantity;
       }
       //Sinon on le met dans le panier(caddy) avec la quantite selectionne
       else {
         productItem=new ProductItem();
         productItem.price=product.currentPrice;
         productItem.quantity+=product.quantity;
         productItem.prodct=product;
         caddy.items.set(product.id,productItem);
         this.saveCaddies();
       }
  }
  public  saveCaddies(){
    localStorage.setItem('myCaddes',JSON.stringify(this.caddies));
  }

  getCurrentCaddy():Caddy{
    return  this.caddies.get(this.currentCaddyName);
  }
  public getTotal():number{
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    for(let key in caddy ){
      total+=caddy.price*caddy.quantity;
    }
    console.log('la valeur'+total);
    return total;
  }
}
