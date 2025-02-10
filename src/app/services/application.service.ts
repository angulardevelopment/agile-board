import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from "graphql-tag";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private httpClient:HttpClient, private apollo: Apollo) { }
 
  clients: string[] = ['EP', 'JetBlue','Citrix'];
  client:string;
  getClients():string[]{
    if(this.client != undefined && this.client != '')
      return this.clients.filter(it => it.toLowerCase() == this.client.toLowerCase());
    else
      return this.clients;
  }
  getSelectedClient():string{
    return this.client;
  }

  setClientFilter(client:string){
    this.client = client;
  }
  // getProjects():Observable<any>{
  //   return this.httpClient.get("https://amagiledashboard1.azurewebsites.net/api/ProjectList?code=wMfTXq5SxhLERI3bQnjkVf66vpYoeCvFIFlH0e8psdXjUUNf8ClnQg==");
  // }

  getProjects(): Observable<any> {
    const mockProjects = [
      { clientName: 'EP', projectName: 'Project1', teamSize: 5, teamCapacity: 50 },
      { clientName: 'JetBlue', projectName: 'Project2', teamSize: 10, teamCapacity: 100 }
    ];
    return of(mockProjects);
  }

  // getClientsList():Observable<any>{
  //   return this.apollo
  //   .query<any>({
  //     query: gql`
  //       listClients{
  //         items{
  //           clientName
  //         }
  //       }
  //     `
  //   });
  // }

  getClientsList(): Observable<any> {
    const mockClients = [
      { clientName: 'EP' },
      { clientName: 'JetBlue' },
      { clientName: 'Citrix' }
    ];
    return of({ data: { listClients: { items: mockClients } } });
  }

  // getProjectsList():Observable<any>{
  //   return this.apollo
  //   .query<any>({
  //     query: gql`
  //       {
  //         listProjects{
  //           items{
  //             clientName,
  //             projectName,
  //             teamSize,
  //             teamCapacity,
  //             sprintId,
  //             created_at,
  //             resources,
  //             defectsFoundUATandProd,
  //             sprintsCompletedInRelease,
  //             sprintBurndownHours
  //           }
  //         }
  //       }
  //     `
  //   });
  // }

  getProjectsList(): Observable<any> {
    const mockProjects = [
      {
        clientName: 'EP',
        projectName: 'Project1',
        teamSize: 5,
        teamCapacity: 50,
        sprintId: '1',
        created_at: '2025-01-01',
        resources: [],
        defectsFoundUATandProd: 0,
        sprintsCompletedInRelease: 1,
        sprintBurndownHours: 40
      },
      {
        clientName: 'JetBlue',
        projectName: 'Project2',
        teamSize: 10,
        teamCapacity: 100,
        sprintId: '2',
        created_at: '2025-01-02',
        resources: [],
        defectsFoundUATandProd: 1,
        sprintsCompletedInRelease: 2,
        sprintBurndownHours: 80
      }
    ];
    return of({ data: { listProjects: { items: mockProjects } } });
  }

  // getProjectsMetricsList():Observable<any>{
  //   return this.apollo
  //   .query<any>({
  //     query: gql`
  //       {
  //         listProjects{
  //           items{
  //             clientName,
  //             projectName,
  //             throughputData,
  //             defectsStateData,
  //             defectsData,
  //             velocityData
  //           }
  //         }
  //       }
  //     `
  //   });
  // }

  getProjectsMetricsList(): Observable<any> {
    const mockMetrics = [
      {
        clientName: 'EP',
        projectName: 'Project1',
        throughputData: [],
        defectsStateData: [],
        defectsData: [],
        velocityData: []
      },
      {
        clientName: 'JetBlue',
        projectName: 'Project2',
        throughputData: [],
        defectsStateData: [],
        defectsData: [],
        velocityData: []
      }
    ];
    return of({ data: { listProjects: { items: mockMetrics } } });
  }


  getCountries(): Observable<Country[]> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRIES,
      })
      .valueChanges.pipe(map((result) => result.data.countries));
  }
}

// write a GraphQL query that asks for information (name , capital, etc..) about all countries
const COUNTRIES = gql`
  {
    countries {
      name
      capital
      currency
      emoji
      phone
      continent {
        name
      }
    }
  }
`;

export interface Country {
  name : string
  capital : string
  currency : string
  emoji : string
  phone : string
  continent : Continent

}

export interface Continent {
  name : string
}

