import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { LocalInstaller } from '../logic/LocalInstaller'; 
import { PackageListService } from '../package-list.service';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  private localInstaller: LocalInstaller

  constructor(private packageList: PackageListService, private electronService: ElectronService) {
    this.localInstaller = new LocalInstaller(this.electronService);
  }

  ngOnInit(): void {
    
  }

  private handle() {
    let dir = document.getElementById('formFile') as HTMLInputElement;
    this.localInstaller.installFileFromLocal(dir.files, this.packageList)
  }

}
