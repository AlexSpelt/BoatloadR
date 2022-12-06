import { Component, OnInit } from '@angular/core';
import { DatabaseHelperService } from '../database-helper.service';
import { GithubHelperService } from '../github-helper.service';

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {

  constructor(private githubHelper: GithubHelperService, private databaseHelper: DatabaseHelperService) { }

  ngOnInit(): void {

    const url = 'https://github.com/lodash/lodash'

    this.githubHelper.getVersion(url).then((versions) => {
      console.log('there are ' + versions.length + ' versions');

      const downloadVersion = versions[0];

      // this.githubHelper.downloadCommit(url, downloadVersion.$commit).then((download) => {
      //   console.log('download complete of version ' + downloadVersion.$version);

      //   console.log(`The donwloaded file is ${download.size} bytes long and is of type ${download.type}`);
      // });

      this.databaseHelper.getAllPackages().then(console.log);
    });
  }

}