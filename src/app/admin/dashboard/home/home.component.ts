import { Component, OnInit } from '@angular/core';
import { ApplicationService } from 'src/app/services/application.service';

interface Place {
  imgSrc: string;
  name: string;
  description: string;
  charge: string;
  location: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  places: Array<Place> = [];
  constructor(public applicationService: ApplicationService) {}
  ngOnInit() {
  }
  getClients():string[]{
    console.log(this.applicationService.getClients(), 'this.applicationService.getClients()');
    
    return this.applicationService.getClients();
  }
}
