import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';

  sourceList: Satellite[];
  displayList: Satellite[];
  allTypes: Array<string>;

	constructor() {
		this.sourceList = [];
		this.displayList = [];
		let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
		
		window.fetch(satellitesUrl).then(function (response) {
			response.json().then(function (data) {

				let fetchedSatellites = data.satellites;
				// loop over satellites
				for(let i=0; i < fetchedSatellites.length; i++) {
					// create a Satellite object 
					let satellite = new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
					// add the new Satellite object to sourceList 
					this.sourceList.push(satellite);
				 }

				 // make a copy of the sourceList to be shown to the user
				 this.displayList = this.sourceList.slice(0);
	  
				 // get all unique types
				 this.allTypes = [...new Set(this.displayList.map(item => item.type))];
				 this.allTypes.map(type => type.toLowerCase());
				 
			}.bind(this));
		}.bind(this));

	}

	search(searchTerm: string): void {
		searchTerm = searchTerm.toLowerCase();				

		// assign this.displayList to be the array of matching satellites
		// this will cause Angular to re-make the table, but now only containing matches
		this.displayList = this.sourceList.slice(0)
		.filter(satellite => (
			satellite.name.toLowerCase().search(searchTerm) >= 0) 
			|| (satellite.type.toLowerCase().search(searchTerm) >= 0
		));		
	}
}
