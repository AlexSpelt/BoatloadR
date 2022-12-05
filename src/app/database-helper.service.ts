import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { Package } from './logic/Package';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHelperService {

  constructor(private http: HttpClient) { }

  /**
     * Search for a package
     */
   public async searchPackages (method: 'name' | 'author' | 'organisation', query: string): Promise<Array<Package>> {    
      return lastValueFrom(
        this.http.get(`https://boatloadr.alexspelt.nl/search/${method}/${query}`) as Observable<Array<Package>>
      )
   }

   /**
     * Get all packages
     */
    public async getAllPackages (): Promise<Array<Package>> {    
      return lastValueFrom(
        this.http.get(`https://boatloadr.alexspelt.nl/packages`) as Observable<Array<Package>>
      )
   }
}
