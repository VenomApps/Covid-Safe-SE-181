import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { DataManagerService } from 'src/app/_services/data-manager.service';

@Component({
  selector: 'app-add-encounter',
  templateUrl: './add-encounter.component.html',
  styleUrls: ['./add-encounter.component.scss']
})
export class AddEncounterComponent implements OnInit {
  location: string = "";
  locationList = [
    "Fresh Grocer",
    "Dunkin Donuts",
    "Space X",
    "Drexel Rec",
    "Lebow",
    "Apple Store"
  ]
  namesList = []
  emailsList = []
  encounterDate = new Date();
  encounterTime: Date = new Date();
  checkModel: string = "Briefly";
  fullName: string = "";
  email: string = "";
  encounters = []
  maxDate = new Date();

  constructor(private dataManager: DataManagerService) { }

  async ngOnInit() {
    let init = await this.dataManager.initEncounters()
    if(init) {
      this.encounters = await this.dataManager.getEncounters()
      let tempL = [...this.locationList]
      this.locationList = this.encounters.map((ele) => {
        return ele.location
      })
      this.locationList = this.locationList.concat(tempL)
      this.emailsList = this.encounters.map((ele) => {
        return ele.email
      })
      this.namesList = this.encounters.map((ele) => {
        return ele.name
      })

    } else {
      Swal.fire({
        title: 'Error Occurred',
        text: "Could not fetch user encounters. Please Try again!",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again!'
      })
    }
  }

  async submitEncounter() {
    if(!!this.location == false || !!this.fullName == false) {
      Swal.fire(
        'Incomplete Encounter!',
        'Please fill out all required fields to continue.',
        'error'
      )
      return
    }

    let encounter = {
      name: this.fullName,
      email: this.email,
      location: this.location,
      time: this.encounterTime,
      date: this.encounterDate,
      uid: `${Math.floor((Math.random() * 999999999) + 1)}`,
      secure: false
    }

    let res = await this.dataManager.addEncounter(encounter)
    console.log('res', res)
    if(res) {
      this.encounters = await this.dataManager.getEncounters()
      this.fullName = ''
      this.email = ''
      this.location = ''
      this.encounterTime = new Date()
      this.encounterDate = new Date()
      Swal.fire(
        'Success!',
        'Encounter Successfuly Added!',
        'success'
      )
    } else {
      Swal.fire(
        'Error',
        'Failed To Add Encounter.Please Try Again!',
        'error'
      )
    }

  }

}
