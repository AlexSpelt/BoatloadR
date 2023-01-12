import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ElectronService } from './core/services';
import { GithubVersion } from './logic/GithubVersion';

@Injectable({
  providedIn: 'root'
})
export class GithubHelperService {

  constructor(private http: HttpClient, private electron: ElectronService) { }

  /**
   * This function returns the version of the package
   */
  public async getVersion(githubUrl: string): Promise<GithubVersion[]> {
    // Example URL
    // https://api.github.com/repos/lodash/lodash/tags 

    // Get info from github
    const newUrl = githubUrl.replace("github.com", "api.github.com/repos") + "/tags";

    // wait till response is received
    const githubResponse = await lastValueFrom(this.http.get(newUrl, {responseType: "json"}))
      .catch((err) => { console.error(err) }) as any[];

    // create array of version objects
    const gitHubVersions = githubResponse.map((version: any) => {
      return new GithubVersion(version.commit.sha, version.name)
    });

    // return array of versions
    return gitHubVersions;
  }

  /**
   * This function downloads the version by commmit
   * @param commit commit hash
   */
  public async downloadCommit(githubUrl: String, commit: String): Promise<Blob> {
    // Example URL
    // https://github.com/lodash/lodash/archive/2f79053d7bc7c9c9561a30dda202b3dcd2b72b90.tar.gz

    const newUrl = `${githubUrl}/archive/${commit}.tar.gz`;
    const installPath = '/src/ros2packages/';
    const fileName = newUrl.replace('https://github.com/','').replace(/\//g, '-')


    const download: Blob | void = await lastValueFrom(this.http.get(newUrl, {responseType: "blob"}))
      .catch((err) => { console.error(err) });

    if(typeof download === 'function') {
      console.log('Download failed');
      return;
    } else {

      // @ts-ignore (typescript is stupid and has the types wrong. This line will tell typescript to *#$%#@.)
      const file: Blob = download;

      const buffer = new Buffer(await file.arrayBuffer());
      
      this.electron.fs.writeFileSync(this.electron.filePathLocalStorage + '/' + fileName, buffer);

      return file;
    }
  }
}
