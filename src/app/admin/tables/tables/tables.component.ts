import { Component, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
// import { Apollo } from 'apollo-angular';
// import gql from "graphql-tag";
import { ApplicationService } from 'src/app/services/application.service';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'table-expandable-rows-example',
  styleUrls: ['tables.component.scss'],
  templateUrl: 'tables.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableExpandableRowsExample {

  @ViewChild('outerSort', { static: true }) sort: MatSort;
  @ViewChildren('innerSort') innerSort: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables: QueryList<MatTable<Address>>;

  dataSource: MatTableDataSource<User>;
  usersData: User[] = [];
  columnsToDisplay = ['client', 'project', 'sprint', 'velocity', 'utilization', 'defectleakage', 'sprintburndown'];
  innerDisplayedColumns = ['client', 'project', 'sprint'];

  displayedColumns = ['Client', 'Project Name', 'Sprint Id', 'Team Size', 'Team Capacity', 'Defect Lekage', 'Sprint Burndown'];
  displayedInnerColumns = ['Client', 'Resource', 'Sprint Id'];

  expandedElement: User | null;
  projects: any[];
  USERS: User[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    // private apollo: Apollo,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
      // this.applicationService.getProjectsList().subscribe(
      //   ({ data, loading }) => {
      //     console.log(data, 'datadata');
          
      //     // this.formatProjectsData(data.listProjects.items);
      //   }
      // );
      
     this.applicationService.getCountries().subscribe((res)=>{
      console.log(res, 'data');
     });
     
     
  }

  formatProjectsData(data:any):void{
    data.forEach(it => {
      let project = {client: it.clientName,project: it.projectName,sprint: it.sprintId,velocity: it.teamSize,utilization: it.teamCapacity,defectleakage: it.defectsFoundUATandProd,sprintburndown: it.sprintBurndownHours,addresses:[]};
      
      it.resources.forEach(it1 => {
        let resource = {client: '',project: it1,sprint: it.sprintId,velocity: 46,utilization: 92,defectleakage: it.defectsFoundUATandProd,sprintburndown: it.sprintBurndownHours};
        project.addresses.push(resource);
      });

      this.USERS.push(project);

    });

    this.USERS.forEach(user => {
      if (user.addresses && Array.isArray(user.addresses) && user.addresses.length) {
        this.usersData = [...this.usersData, { ...user, addresses: new MatTableDataSource(user.addresses) }];
      } else {
        this.usersData = [...this.usersData, user];
      }
    });
    this.dataSource = new MatTableDataSource(this.usersData);
    this.dataSource.sort = this.sort;
  }

  toggleRow(element: User) {
    element.addresses && (element.addresses as MatTableDataSource<User>).data.length ? (this.expandedElement = this.expandedElement === element ? null : element) : null;
    this.cd.detectChanges();
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).sort = this.innerSort.toArray()[index]);
  }

  applyFilter(filterValue: string) {
    this.innerTables.forEach((table, index) => (table.dataSource as MatTableDataSource<Address>).filter = filterValue.trim().toLowerCase());
  }
}

export interface User {
  client: string;
  project: string;
  sprint: string;
  velocity: number;
  utilization: number;
  defectleakage: number;
  sprintburndown: number;
  addresses?: User[] | MatTableDataSource<User>;
}

export interface Address {
  street: string;
  zipCode: string;
  city: string;
}



// const USERS: User[] = [
//   {
//     client: 'EP',project: 'Dataservices',sprint: '2020.02.R1.S01',velocity: 46,utilization: 92,defectleakage: 2,sprintburndown: 90,
//     addresses: [
//       { client: '', project: 'Sandeep', sprint: '2020.02.R1.S01', velocity: 12, utilization: 100, defectleakage: 1, sprintburndown: 100 },
//       { client: '', project: 'Michelle', sprint: '2020.02.R1.S01', velocity: 8, utilization: 90, defectleakage: 0, sprintburndown: 90 },
//       { client: '', project: 'Nilesh', sprint: '2020.02.R1.S01', velocity: 9, utilization: 86, defectleakage: 0, sprintburndown: 95 },
//       { client: '', project: 'Syed', sprint: '2020.02.R1.S01', velocity: 9, utilization: 95, defectleakage: 1, sprintburndown: 85 },
//       { client: '', project: 'Alam', sprint: '2020.02.R1.S01', velocity: 8, utilization: 89, defectleakage: 0, sprintburndown: 80 }
//     ]
//   },
//   {
//     client: 'EP', project: 'SmartStart', sprint: '2020.02.R1.S01', velocity: 36, utilization: 80, defectleakage: 0, sprintburndown: 75,
//     addresses: [
//       { client: '', project: 'Vamsi', sprint: '2020.02.R1.S01', velocity: 11, utilization: 95, defectleakage: 0, sprintburndown: 80 },
//       { client: '', project: 'Vijay', sprint: '2020.02.R1.S01', velocity: 10, utilization: 70, defectleakage: 0, sprintburndown: 70 },
//       { client: '', project: 'Mohammad', sprint: '2020.02.R1.S01', velocity: 7, utilization: 75, defectleakage: 0, sprintburndown: 75 },
//       { client: '', project: 'Amit', sprint: '2020.02.R1.S01', velocity: 8, utilization: 80, defectleakage: 0, sprintburndown: 75 }
//     ]
//   },
//   {
//     client: 'EP', project: 'IPS', sprint: '2020.02.R1.S01', velocity: 23, utilization: 60, defectleakage: 1, sprintburndown: 55,
//     addresses: [
//       { client: '', project: 'Parsuram', sprint: '2020.02.R1.S01', velocity: 8, utilization: 60, defectleakage: 0, sprintburndown: 60 },
//       { client: '', project: 'Briyan', sprint: '2020.02.R1.S01', velocity: 6, utilization: 50, defectleakage: 1, sprintburndown: 55 },
//       { client: '', project: 'Myron', sprint: '2020.02.R1.S01', velocity: 9, utilization: 70, defectleakage: 0, sprintburndown: 50 }
//     ]
//   },
//   {
//     client: 'EP', project: 'PSG', sprint: '2020.02.R1.S01', velocity: 40, utilization: 70, defectleakage: 3, sprintburndown: 65,
//     addresses: [
//       { client: '', project: 'Krishna', sprint: '2020.02.R1.S01', velocity: 13, utilization: 70, defectleakage: 0, sprintburndown: 70 },
//       { client: '', project: 'Prabhu', sprint: '2020.02.R1.S01', velocity: 11, utilization: 50, defectleakage: 2, sprintburndown: 62 },
//       { client: '', project: 'Sandeep', sprint: '2020.02.R1.S01', velocity: 16, utilization: 90, defectleakage: 1, sprintburndown: 68 }
//     ]
//   },
//   {
//     client: 'Citrix', project: 'VM', sprint: '2020.02.R1.S01', velocity: 40, utilization: 70, defectleakage: 3, sprintburndown: 65,
//     addresses: [
//       { client: '', project: 'Nayab', sprint: '2020.02.R1.S01', velocity: 13, utilization: 70, defectleakage: 0, sprintburndown: 70 },
//       { client: '', project: 'Myron', sprint: '2020.02.R1.S01', velocity: 11, utilization: 50, defectleakage: 2, sprintburndown: 62 }

//     ]
//   },
//   {
//     client: 'Citrix', project: 'AnyConnect', sprint: '2020.02.R1.S01', velocity: 40, utilization: 70, defectleakage: 3, sprintburndown: 65,
//     addresses: [
//       { client: '', project: 'Raghav', sprint: '2020.02.R1.S01', velocity: 13, utilization: 70, defectleakage: 0, sprintburndown: 70 },
//       { client: '', project: 'Gopi', sprint: '2020.02.R1.S01', velocity: 11, utilization: 50, defectleakage: 2, sprintburndown: 62 },
//       { client: '', project: 'Prasu', sprint: '2020.02.R1.S01', velocity: 16, utilization: 90, defectleakage: 1, sprintburndown: 68 }

//     ]
//   },
//   {
//     client: 'Jetblue', project: 'Checkin', sprint: '2020.02.R1.S01', velocity: 40, utilization: 70, defectleakage: 3, sprintburndown: 65,
//     addresses: [
//       { client: '', project: 'Nagarjuna', sprint: '2020.02.R1.S01', velocity: 13, utilization: 70, defectleakage: 0, sprintburndown: 70 },
//       { client: '', project: 'Bhanu', sprint: '2020.02.R1.S01', velocity: 11, utilization: 50, defectleakage: 2, sprintburndown: 62 },
//       { client: '', project: 'Jody', sprint: '2020.02.R1.S01', velocity: 16, utilization: 90, defectleakage: 1, sprintburndown: 68 }
//     ]
//   }
// ];
