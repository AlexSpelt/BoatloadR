import { Injectable } from '@angular/core';
import { DBHelperService } from './dbhelper.service';
import { Package } from './logic/Package';
import { CommunicationNode } from './logic/CommunicationNode';
import { Type } from './logic/Type'
import { ElectronService } from './core/services';

import { json } from 'stream/consumers';
import { on } from 'events';
import { NodesRelation } from './logic/NodesRelation';

@Injectable({
  providedIn: 'root'
})
export class PackageListService {
  
  private readonly serverURL: string = 'https://BoatLoadR.alexspelt.nl';
  private listInstall: Array<Package> = [];
  private listActive: Array<Package> = [];
  private relations: Array<NodesRelation> = [];

  constructor(private electron: ElectronService, private dbHelper: DBHelperService) {
    this.getAllInstalled().then((packages) => {
      this.$listInstall = packages;
    });
  }

  /**
   * This function is responsible for crreating a package based on
   * the data from the downloaded github repo and the data from the redis database.
   * It sends the created pacakge to the list used in the application.
   * @param name name of the package
   * @param version version of the packe
   * @param author author of the package
   * @param organisation organisation of the author
   * @param repoURL URL of the github repository
   * @param versions other versions of the package
   */
  public createPackage(name: string, version: string, author: string, organisation: string, repoURL: string, versions: Array<string>) {
    // nodes moet worden gelezen uit de JSON/YAML/XML/markup-flavor van de package. bottom is palceholder code
    let nodes = [new CommunicationNode(false, Type.coordinate), new CommunicationNode(true, Type.directions)]

    const p = new Package(name, repoURL, author, organisation, false, version, versions, nodes);
    p.install()

    this.addInstalledPackage(p);
  }

  /**
   * Gets all installed packages to initialize the installed list array
   * @returns list of all installed packages
   */
  public getAllInstalled(): Promise<Package[]> {
    return new Promise((resolve) => {
      let list = []

      this.electron.ipcRenderer.send('read-local-status');
      this.electron.ipcRenderer.on('send-local-status', (event, arg) => {
        let json = JSON.parse(arg);

        json.forEach((element, i) => {
          let nodes = [];
          element.nodes.forEach(n => {
            let node = new CommunicationNode(n.isOut, n.type);
            nodes.push(node);
          });
          let p = new Package(element.name, element.repoURL, element.author, element.organisation, true, element.version, element.versions, nodes);
          list.push(p);

          if (i == json.length - 1) {
            resolve(list);
          } 
        });
      });
    });
  }

  /**
   * Adder for the install list
   * @param p Package to add to the installed list
   */
  public addInstalledPackage(p: Package) {
    // add to db.json
    this.electron.fs.readFile('./app/src/DB-json/db.json', (err, data) => {
      let jsonFile = JSON.parse(data.toString());
      jsonFile.push(p);

      let jsonData = JSON.stringify(jsonFile);
      this.electron.fs.writeFile('./app/src/DB-json/db.json', jsonData, {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
      },
        (err) => {
          if (err)
            console.log(err);
        });
    });
    // add to $listInstall
    this.listInstall.push(p);
    // mark package installed
    p.$isInstalled = true;
  }

  /**
   * This function is responsible for filtering in the list
   * @param method search method
   * @param query string to filter on
   * @returns packages that fit filter
   */
  public searchPackages(method: 'name' | 'author' | 'organisation' | 'all', query: string): Array<Package> {
    const filterList: Package[] = []

    switch (method) {
      case 'name':
        this.listInstall.filter(function (el) {
          if (el.$name.includes(query)) {
            filterList.push(el);
          }
        })
      case 'author':
        this.listInstall.filter(function (el) {
          if (el.$author.includes(query)) {
            filterList.push(el);
          }
        })
      case 'organisation':
        console.log('ja ik kom hier')
        this.listInstall.filter(function (el) {
          if (el.$organisation.includes(query)) {
            filterList.push(el);
          }
        })
      case 'all':
        this.listInstall.filter(function (el) {
          // sorry voor die nodes filter, -Gianni
          if (el.$name.includes(query) || 
            el.$author.includes(query) || 
            el.$organisation.includes(query)) {
              filterList.push(el);
          }
        })
    }

    console.log("filterlist: ", filterList);
    return filterList;
  }

  /** 
   * Remover for the install list
   * @param p Package to remove from the installed list
   */
  public removeInstalledPackage(p: Package) {
    this.listInstall.splice(this.listInstall.indexOf(p), 1)
  }

  /**
   * Adder for the active list
   * @param p Package to add to the active list
   */
  public addActivePackage(p: Package) {
    this.listActive.push(p);
  }

  /**
   * Remover for the active list
   * @param p Package to remove from the active list
   */
  public removeActivePackage(p: Package) {
    this.listActive.splice(this.listActive.indexOf(p), 1)
  }

  /**
   * Adder for the relations
   * @param relation Relation to be added to the list
   */
  public addRelation(relation: NodesRelation) {
    this.relations.push(relation);
  }

  /**
   * Remover for the relations
   * @param relation Relation to be removed from the list
   */
  public removeRelation(relation: NodesRelation) {
    this.relations.splice(this.relations.indexOf(relation), 1)
  }

  /**
   * Getter $serverURL
   * @return {string}
   */
  public get $serverURL(): string {
    return this.serverURL;
  }

  /**
   * Getter $listInstall
   * @return {Array<Package>}
   */
  public get $listInstall(): Array<Package> {
    return this.listInstall;
  }

  /**
   * Getter $listActive
   * @return {Array<Package>}
   */
  public get $listActive(): Array<Package> {
    return this.listActive;
  }

  /**
   * Getter $relations
   * @return {Array<Relation>}
   */
  public get $relations(): Array<NodesRelation> {
    return this.relations;
  }

  /**
   * Setter $listInstall
   * @param {Array<Package>} value
   */
  private set $listInstall(value: Array<Package>) {
    this.listInstall = value;
  }

  /**
   * Setter $listActive
   * @param {Array<Package>} value
   */
  private set $listActive(value: Array<Package>) {
    this.listActive = value;
  }

  /**
   * Setter $relations
   * @param {Array<Relation>} value
   */
  private set $relations(value: Array<NodesRelation>) {
    this.relations = value;
  }
}
