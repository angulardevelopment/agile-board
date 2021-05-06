import { Injectable } from '@angular/core';
@Injectable()
export class DataService {
  getProjects():ProjectData[]{
    return [
      new ProjectData({project:"Suscipit Nonummy Ltd", subproject:"Ante Dictum Consulting", capacityUtilization: 23, releaseSprint: 43, velocity: 12, defectLekage :13, sprintBurndownReport: 14, workItemAge: 15}),
      new ProjectData({project:"Diam Duis Mi Limited", subproject:"Suscipit Nonummy Ltd", capacityUtilization: 43, releaseSprint: 34, velocity: 12, defectLekage :13, sprintBurndownReport: 14, workItemAge: 15}),
      new ProjectData({project:"Non Corp.", subproject:"Velit Aliquam LLP", capacityUtilization: 54, releaseSprint: 10, velocity: 12, defectLekage :13, sprintBurndownReport: 14, workItemAge: 15}),
      new ProjectData({project:"Vestibulum Neque Ltd", subproject:"Sapien Molestie Corporation", capacityUtilization: 65, releaseSprint: 12, velocity: 12, defectLekage :13, sprintBurndownReport: 14, workItemAge: 15}),
      new ProjectData({project:"Lorem Corp.", subproject:"Suscipit Nonummy Ltd", capacityUtilization: 76, releaseSprint: 12, velocity: 12, defectLekage :13, sprintBurndownReport: 14, workItemAge: 15})
    ];
  }
 
}

export class ProjectData {
  project: string;
  subproject: string;
  capacityUtilization: number;
  releaseSprint: number;
  velocity: number;
  defectLekage: number;
  sprintBurndownReport: number;
  workItemAge: number;

  /**
   *
   */
  constructor(options?:
    {
      project: string;
      subproject: string;
      capacityUtilization: number;
      releaseSprint: number;
      velocity: number;
      defectLekage: number;
      sprintBurndownReport: number;
      workItemAge: number;
    }) {
    this.project = options.project;
    this.subproject = options.subproject;
    this.capacityUtilization = options.capacityUtilization;
    this.releaseSprint = options.releaseSprint;
    this.velocity = options.velocity;
    this.defectLekage = options.defectLekage;
    this.sprintBurndownReport = options.sprintBurndownReport;
    this.workItemAge = options.workItemAge;
  }
}