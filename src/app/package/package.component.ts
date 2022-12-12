import { Component, OnInit } from '@angular/core';
import { DatabaseHelperService } from '../database-helper.service';
import { Package } from '../logic/Package';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  packageList: Array<Package> = [];
  
  searchRequest = new searchQuery('', 'all');

  constructor(private databaseHelper: DatabaseHelperService) {
    this.databaseHelper.getAllPackages()
      .then(packages => this.packageList = packages)
      .catch(() => this.packageList = []);
  }

  ngOnInit(): void {
  }

  searchPackages() {
    if(this.searchRequest.query === '')
      this.databaseHelper.getAllPackages()
        .then(packages => this.packageList = packages)
        .catch(() => this.packageList = []);
    else
      this.databaseHelper.searchPackages(
        this.searchRequest.method, 
        this.searchRequest.query
      )
        .then(packages => this.packageList = packages)
        .catch(() => this.packageList = []);
  }

}

class searchQuery {
  constructor(
    public query: string,
    public method: 'name' | 'author' | 'organisation' | 'all'
  ) {}
}