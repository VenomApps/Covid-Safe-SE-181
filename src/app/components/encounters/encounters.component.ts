import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";
import { DataManagerService } from 'src/app/_services/data-manager.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-encounters',
  templateUrl: './encounters.component.html',
  styleUrls: ['./encounters.component.scss']
})
export class EncountersComponent implements OnInit {
  rows = []
  temp = []
  searchSubscripton: Subscription
  @ViewChild(DatatableComponent) table: DatatableComponent;
  ColumnMode = ColumnMode;

  constructor(private dataManager: DataManagerService) { }

  async ngOnInit() {
    let init = await this.dataManager.initEncounters()
    if (init) {
      await this.initEncounters()
    } else {
      Swal.fire({
        title: 'Error Occurred',
        text: "Could not fetch user encounters. Please Try again!",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again!'
      })
    }

    this.searchSubscripton = this.dataManager.filterSubject.subscribe((value) => {
      this.updateFilter(value)
    })
  }

  async initEncounters() {
    let encounters = await this.dataManager.getEncounters()
    this.temp = [...encounters];
    this.rows = encounters
  }

  updateFilter(val) {
    val = val.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.location.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  delete(uid) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this encounter!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.value) {
        await this.dataManager.deleteEncounter(uid)
        await this.initEncounters()
        Swal.fire(
          'Deleted!',
          'Your encounter has been deleted.',
          'success'
        )
      }
    })
  }

  sendCustomMessage(uid) {
    Swal.fire({
      title: 'Notify User',
      input: 'textarea',
      inputValue: 'Hi, I am emailing you today to inform you that I have come in contact with you and am currently experiencing symptoms of Covid-19. Please go get tested at your local testing center!',
      inputPlaceholder: 'Coivd-19 Message',
      inputAttributes: {
        'aria-label': 'Type your message here',
        'aria-rows': '15'
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: (code) => {
        return fetch(`http://localhost:3000/api/send-message`,{method: 'POST'})
          .then(async (response) => {
            if (response.ok) {
              // set info field to notified
              await this.initEncounters()
              Swal.fire(
                'Message Sent!',
                'We have alerted the opposing party of your encounter!',
                'success'
              )
            } else {
              Swal.showValidationMessage(
                'Message Failed To Send. Please Try Again!'
              )
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              'Message Failed To Send. Please Try Again!'
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  ngOnDestroy(){
    if(!!this.searchSubscripton) {
      this.searchSubscripton.unsubscribe()
    }
  }

}
