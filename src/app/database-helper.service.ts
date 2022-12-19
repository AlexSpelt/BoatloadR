import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { GithubHelperService } from './github-helper.service';
import { GithubVersion } from './logic/GithubVersion';
import { Package } from './logic/Package';
import { Component } from './logic/Component';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHelperService {

  constructor(private http: HttpClient, private githubHelper: GithubHelperService) { }

  /**
     * Search for a package
     */
  public async searchPackages (method: 'name' | 'author' | 'organisation' | 'all', query: string): Promise<Array<Package>> {    
    const response = await lastValueFrom(
      this.http.get(`https://boatloadr.alexspelt.nl/search/${method}/${query}`) as Observable<string>
    ) as any as dbResponse[];

    return Promise.all(response.map((val) => this.dbToPackage(val)));
  }

   /**
     * Get all packages
     */
  public async getAllPackages (): Promise<Array<Package>> {    
    const response = await lastValueFrom(
      this.http.get(`https://boatloadr.alexspelt.nl/packages`) as Observable<string>
    ) as any as dbResponse[];

    return Promise.all(response.map((val) => this.dbToPackage(val)));
  }

  /**
   * this mothed will ask the API to create a package
   * @param dbRecord object that contains the necessary information to create a package
   */
  public async createPackage(dbRecord: dbResponse): Promise<any> {
      return lastValueFrom(
        this.http.post('https://boatloadr.alexspelt.nl/package', dbRecord, {responseType: 'text'})
      );
  }

  /**
   * this method will ask the API to remove a package
   * @param key key of the package to remove
   */
  public async removePackage(key: string): Promise<any> {
    return lastValueFrom(
      this.http.delete(`https://boatloadr.alexspelt.nl/package/${key}`, {responseType: 'text'})
    );
  }

   private async dbToPackage(dbPackage: any): Promise<Package> {

    if((!dbPackage.filePath && !dbPackage.githubRepo))
      return undefined;

    let githubVersionInfo: GithubVersion[];
    let fileVersionInfo: string;

    if(!(dbPackage.githubRepo === undefined || dbPackage.githubRepo === null))
      // @ts-ignore
      githubVersionInfo = await this.githubHelper.getVersion(dbPackage.githubRepo)
        .catch((err) => { console.log('package ' + dbPackage.key + ' does not excist') });

    if(!(dbPackage.filePath === undefined || dbPackage.filePath === null))
      fileVersionInfo = '1.0.0'; // TODO package resolver hier zetten.

    // TODO make shure git versions are integrated. There not right now for some reason. ⚠️

    return new Package(
      dbPackage.key, 
      dbPackage.githubRepo, 
      dbPackage.author,
      dbPackage.organisation,
      false,
      fileVersionInfo ?? githubVersionInfo[0].$version,
      [fileVersionInfo] ?? githubVersionInfo.map(versionInfo => versionInfo.$version),
      []
    );
   }

    /**
     * Get all builds
     */
    public async getAllBuilds (): Promise<Array<Component>> {
        const response = await lastValueFrom(
            this.http.get(`https://boatloadr.alexspelt.nl/builds`) as Observable<string>
        ) as any as dbResponse[];

        return Promise.all(response.map((val) => this.dbToPackage(val)));
    }
}

export interface dbResponse {
  key: string;
  githubRepo?: string;
  filePath?: string;
  author: string;
  organisation: string;
}