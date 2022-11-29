import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DBHelperService {

  constructor(private HTTP: HttpClient) { }

  /**
   * This function is responsible for returning all packages in database
   * @param URL Server URL
   * @returns array of all objects in database
   */
  public async read(URL: string): Promise<Array<JSONpromise>> {
    // @ts-ignore
    return await lastValueFrom(this.HTTP.get(URL + '/packages', {responseType: "json"}))
  }

  /**
   * This function is responsible for returning all packages that fit querry
   * @param URL Server URL
   * @param q Querry
   * @param searchType Querry type 
   * @returns array of possible objects
   */
  public async find(URL: string, q: string, searchType: SearchType): Promise<Array<JSONpromise>> {
    switch (searchType) {
      case SearchType.name:
        //@ts-ignore
        return await lastValueFrom(this.HTTP.get(URL + '/search/name/' + q, {responseType: "json"}))
      case SearchType.author:
        //@ts-ignore
        return await lastValueFrom(this.HTTP.get(URL + '/search/author/' + q, {responseType: "json"}))
      case SearchType.organisation:
        //@ts-ignore
        return await lastValueFrom(this.HTTP.get(URL + '/search/organisation/' + q, {responseType: "json"}))
    }
  }
}

export interface JSONpromise {
  key: string,
  githubRepo: string,
  author: string,
  organisation: string  
}

export enum SearchType {
  name, author, organisation
}