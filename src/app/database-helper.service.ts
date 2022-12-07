import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { GithubHelperService } from './github-helper.service';
import { GithubVersion } from './logic/GithubVersion';
import { Package } from './logic/Package';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHelperService {

  constructor(private http: HttpClient, private githubHelper: GithubHelperService) { }

  /**
     * Search for a package
     */
   public async searchPackages (method: 'name' | 'author' | 'organisation', query: string): Promise<Array<Package>> {    
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

   private async dbToPackage(dbPackage: any): Promise<Package> {
    console.log(dbPackage)

    if((!dbPackage.filePath && !dbPackage.githubRepo))
      return undefined;

    let githubVersionInfo: GithubVersion[];
    let fileVersionInfo: string;

    if(!(dbPackage.githubRepo === undefined || dbPackage.githubRepo === null))
      // @ts-ignore
      githubVersionInfo = await this.githubHelper.getVersion(dbPackage.githubRepo)
        .catch((err) => { console.log('package ' + dbPackage.key + ' does not excist') });

    if(!(dbPackage.filePath === undefined || dbPackage.filePath === null))
      fileVersionInfo = 'Een versie ofzo'; // TODO package resolver hier zetten.

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
}

interface dbResponse {
  key: string;
  githubRepo?: string;
  filePath?: string;
  author: string;
  organisation: string;
}