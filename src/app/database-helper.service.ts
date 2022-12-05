import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { GithubHelperService } from './github-helper.service';
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
      )

      const parsedResponse: dbResponse[] = JSON.parse(response);

      return Promise.all(parsedResponse.map(this.dbToPackage));
   }

   /**
     * Get all packages
     */
    public async getAllPackages (): Promise<Array<Package>> {    
      const response = await lastValueFrom(
        this.http.get(`https://boatloadr.alexspelt.nl/packages`) as Observable<string>
      )

      const parsedResponse: dbResponse[] = JSON.parse(response);

      return Promise.all(parsedResponse.map(this.dbToPackage));
   }

   private async dbToPackage(dbPackage: any): Promise<Package> {
      // TODO local file resolver instead of github
      const versionsInfo = await this.githubHelper.getVersion(dbPackage.githubUrl);

      return new Package(
        dbPackage.key, 
        dbPackage.githubRepo, 
        dbPackage.author,
        dbPackage.organisation,
        false,
        versionsInfo[0].$version,
        versionsInfo.map(versionInfo => versionInfo.$version),
        []
      );
   }
}

interface dbResponse {
  key: string;
  githubRepo: string;
  author: string;
  organisation: string;
}