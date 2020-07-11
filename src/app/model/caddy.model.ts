import {ProductItem} from './product-Item.model';
import {Client} from './client.model';

//Un panier est un ensemble de produit item
export class Caddy{
   public  name:string;
   public items:Map<number,ProductItem> =new Map();
   public  client :Client;
  constructor(name:string) {
    this.name=name;
  }
}
