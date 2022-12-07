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
  private electronService: ElectronService

  constructor(private packageList: PackageListService) {
    this.electronService = new ElectronService();
    this.localInstaller = new LocalInstaller(this.electronService);
  }

  ngOnInit(): void {
    let btn = document.getElementById('submitBtn');
    btn.addEventListener('click', this.handle);
  }

  private handle() {
    let dir = document.getElementById('formFile') as HTMLInputElement;
    console.log(dir.files);

    this.localInstaller.installFileFromLocal(dir.files, this.packageList)
  }

}
