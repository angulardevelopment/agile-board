import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';
import { Observable, throwError } from 'rxjs';
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
  getProjects():Observable<any>{
    return this.httpClient.get("https://amagiledashboard1.azurewebsites.net/api/ProjectList?code=wMfTXq5SxhLERI3bQnjkVf66vpYoeCvFIFlH0e8psdXjUUNf8ClnQg==");
  }

  getClientsList():Observable<any>{
    return this.apollo
    .query<any>({
      query: gql`
        listClients{
          items{
            clientName
          }
        }
      `
    });
  }

  getProjectsList():Observable<any>{
    return this.apollo
    .query<any>({
      query: gql`
        {
          listProjects{
            items{
              clientName,
              projectName,
              teamSize,
              teamCapacity,
              sprintId,
              created_at,
              resources,
              defectsFoundUATandProd,
              sprintsCompletedInRelease,
              sprintBurndownHours
            }
          }
        }
      `
    });
  }
  getProjectsMetricsList():Observable<any>{
    return this.apollo
    .query<any>({
      query: gql`
        {
          listProjects{
            items{
              clientName,
              projectName,
              throughputData,
              defectsStateData,
              defectsData,
              velocityData
            }
          }
        }
      `
    });
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

