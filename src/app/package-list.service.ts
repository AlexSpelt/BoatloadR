import { Injectable } from '@angular/core';
import { DBHelperService } from './dbhelper.service';
import { Package } from './logic/Package';
import { CommunicationNode } from './logic/CommunicationNode';
import { Type } from './logic/Type'

@Injectable({
  providedIn: 'root'
})
export class PackageListService {
  private readonly serverURL: string = 'https://BoatLoadR.alexspelt.nl';
  private listInstall: Array<Package> = this.getAllInstalled(this.serverURL);
  private listActive: Array<Package> = [];
  private relations: Array<Relation> = [];

  constructor() { }

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
  public createPackage(name: string, version: string, author: string, organisation: string, repoURL: string, versions: Array<string>){
    // nodes moet worden gelezen uit de JSON/YAML/XML/markup-flavor van de package. bottom is palceholder code
    let nodes = [new CommunicationNode(false, Type.coordinate), new CommunicationNode(true, Type.directions)] 

    const p = new Package(name, repoURL, author, organisation, false, version, versions, nodes);

    this.addInstalledPackage(p);
  }

  /**
   * Gets all installed packages to initialize the installed list array
   * @param serverURL The URL of the server to get the packages from
   * @returns list of all installed packages
   */
  private getAllInstalled(serverURL: string): Array<Package> {
    throw new Error("Method not implemented.");
  }

  /**
   * Adder for the install list
   * @param p Package to add to the installed list
   */
  public addInstalledPackage(p: Package) {
    this.listInstall.push(p);
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
  public addRelation(relation: Relation) {
    this.relations.push(relation);
  }

  /**
   * Remover for the relations
   * @param relation Relation to be removed from the list
   */
  public removeRelation(relation: Relation) {
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
  public get $relations(): Array<Relation> {
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
  private set $relations(value: Array<Relation>) {
    this.relations = value;
  }
}