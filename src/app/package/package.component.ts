import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';
import { LocalInstaller } from '../logic/LocalInstaller'; 
import { PackageListService } from '../package-list.service';
import { DatabaseHelperService, dbResponse } from '../database-helper.service';
import { Package } from '../logic/Package';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  private localInstaller: LocalInstaller
  private packageList: Array<Package> = [];
  
  searchRequestForm = new searchQueryForm('', 'all');
  addPackageForm = new createPackageForm('', '', '', '', '');

  constructor(private databaseHelper: DatabaseHelperService, private packageListService: PackageListService, private electronService: ElectronService) {
    this.localInstaller = new LocalInstaller(this.electronService);
  
    // get remote packages
    databaseHelper.getAllPackages()
      .then(packages => {
        this.packageList = packages;
        console.log(this.packageList)
      })
      .catch(() => this.packageList = []);

    // add local packages to the list
    packageListService.getAllInstalled().then(packages => {
      console.log('aaaaaa----------------------------------------')
      this.packageList = [ ...this.packageList, ...packages ];
    })
    .catch(() => console.error('Die locale tyfus werkt niet.'));

    console.log(packageListService.getAllInstalled())


  }

  ngOnInit(): void {
    
  }

  private handle() {
    let dir = document.getElementById('formFile') as HTMLInputElement;
    this.localInstaller.installFileFromLocal(dir.files, this.packageListService)
  }

  searchPackages() {
    if(this.searchRequestForm.query === '')
      this.databaseHelper.getAllPackages()
        .then(packages => this.packageList = packages)
        .catch(() => this.packageList = []);
    else
      this.databaseHelper.searchPackages(
        this.searchRequestForm.method, 
        this.searchRequestForm.query
      )
        .then(packages => this.packageList = packages)
        .catch(() => this.packageList = []);
  }

  addPackage() {
    console.log(this.addPackageForm)

    // One of either has to be defined. But not both. (XOR)
    if((this.addPackageForm.githubRepo && !this.addPackageForm.filePath) || 
      (!this.addPackageForm.githubRepo && this.addPackageForm.filePath)) {

        const dbRecord: dbResponse = {
          key: this.addPackageForm.name,
          organisation: this.addPackageForm.organisation,
          author: this.addPackageForm.author,
          githubRepo: this.addPackageForm.githubRepo,
          filePath: this.addPackageForm.filePath
        };

        this.databaseHelper.createPackage(dbRecord)
          .then(() => {
            this.addPackageForm = new createPackageForm('', '', '', '', '');
            this.searchRequestForm = new searchQueryForm('', 'all');
            this.searchPackages();
          })
          .catch((err) => {
            alert(`Error while creating package. Error: ${err}`)
          });

    }
  }

  removePackage(key: string) {
    if(confirm(`Are you sure you want to delete ${key}?`))
      this.databaseHelper.removePackage(key)
        .then(() => {
          this.searchPackages();
          alert(`${key} is deleted.`)
        })
        .catch((err) => {
          alert(`Error while removing package. Error: ${err}`)
        });

  }

  formValid: boolean = false;

  isFormValid() {
    // check if package add form is filled
    this.formValid = (
      this.addPackageForm.name !== '' && 
      this.addPackageForm.author !== '' && 
      this.addPackageForm.organisation !== '' &&
      !!((this.addPackageForm.githubRepo && !this.addPackageForm.filePath) || 
      (!this.addPackageForm.githubRepo && this.addPackageForm.filePath))
    )
  }

}

class searchQueryForm {
  constructor(
    public query: string,
    public method: 'name' | 'author' | 'organisation' | 'all'
  ) {}
}

class createPackageForm {
  constructor(
    public name: string,
    public author: string,
    public organisation: string,
    public githubRepo: string,
    public filePath: string
  ) {}
}