import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartLabels: string[] = [
    'Oct-19',
    'Nov-19',
    'Dec-19',
    'Jan-20',
    'Feb-20',
    'Mar-20',
    'Apr-20'
  ];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Available' },
    { data: [28, 48, 40, 19, 46, 27, 38], label: 'Utilized' }
  ];
  constructor() {}

  ngOnInit() {}

  chartClicked(e: any): void {
    console.log(e.active);
    console.log(e.event);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
