import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { PackageListService } from '../package-list.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {

  constructor(private electron: ElectronService, private packageList:PackageListService) { 

  }

  ngOnInit(): void {
    console.log(this.packageList.$listInstall);
  }

}
