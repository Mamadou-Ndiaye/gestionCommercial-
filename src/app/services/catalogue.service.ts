import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product.model';
import {environment} from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  //public  host ="http://localhost:9090";
  // public  host ="https://vente-en-ligne-backend.herokuapp.com/";
  public  host =environment.host;

  constructor(private  httpClient: HttpClient) { }
//methode generique pour recuperer une ressource
  public getRessource(url){
    return this.httpClient.get(this.host+url);
  }
  //envoie une renvoie mais le resultat qu on attend est un product deja dou le product a l'interieur de <> duget
  public getProductt(url):Observable<Product> {
    return this.httpClient.get<Product>(url);
  }

  public getProduct(page:number,size:number) {
    return this.httpClient.get(this.host +"/products?page="+page+"&size="+size);
  }

  public getProductbyKeyword(mc:string,page:number,size:number) {

    return this.httpClient.get(this.host +"/products/search/byNamePage?mc="+mc+"&page="+page+"&size="+size);
  }
  public deleteResssouce(url) {
      return this.httpClient.delete(url);

  }

  public saveResssouce(url,data) {
    return this.httpClient.post(url,data);

  }

  public updateResssouce(url,data) {
    return this.httpClient.put(url,data);

  }

  uploadPhotoProduct(file: File, idProduct) {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req);
  }

  public patchResource(url,data){
    return this.httpClient.patch(url,data);
  }
}
