import { Component, OnInit } from '@angular/core';
import { DatabaseHelperService, dbResponse } from '../database-helper.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit {
  private buildList: Array<Component> = [];

  constructor(private databaseHelper: DatabaseHelperService, ) {
    this.databaseHelper.getAllBuilds()
        .then(builds => {
          console.log("Console log is here");
          console.log(builds);
        })
        .catch(() => this.buildList = []);
  }

  ngOnInit(): void {
  }

}
