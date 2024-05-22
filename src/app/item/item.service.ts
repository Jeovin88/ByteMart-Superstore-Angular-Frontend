import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
  
import { Item } from './item';
  
@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  //private apiURL = "https://jsonplaceholder.typicode.com";
  private apiURL = "http://localhost:9091/bytemart";
    
  /*------------------------------------------
  --------------------------------------------
  Http Header Options
  --------------------------------------------
  --------------------------------------------*/
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(private httpClient: HttpClient) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  getAll(): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/get/item')
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  find(id:number): Observable<any> {
  
    return this.httpClient.get(this.apiURL + '/get/item/' + id)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }

    /**
   * Write code on Method
   *
   * @return response()
   */
    create(item:Item): Observable<any> {
  
      return this.httpClient.post(this.apiURL + '/save/item', JSON.stringify(item), this.httpOptions)
    
      .pipe(
        catchError(this.errorHandler)
      )
    }  
      
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  update(id:number, item:Item): Observable<any> {
  
    //return this.httpClient.put(this.apiURL + '/items/' + id, JSON.stringify(item), this.httpOptions)
    return this.httpClient.put(this.apiURL + '/update/item', JSON.stringify(item), this.httpOptions)
    //return this.httpClient.put(this.apiURL + '/update/item', item, this.httpOptions)
 
    .pipe( 
      catchError(this.errorHandler)
    )
  }
       
  /**
   * Write code on Method
   *
   * @return response()
   */
  delete(id?:string){
    return this.httpClient.delete(this.apiURL + '/delete/item/' + id, this.httpOptions)
  
    .pipe(
      catchError(this.errorHandler)
    )
  }
      
  /** 
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}