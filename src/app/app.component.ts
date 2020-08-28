import { Component } from '@angular/core';
import { DataManagerService } from './_services/data-manager.service';
declare let feather: any; 
import Swal from "sweetalert2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-safe';
  search = ''
  constructor(private dataManager: DataManagerService) {

  }

  ngAfterViewInit(): void {
    feather.replace()
  }

  ngModelChange(value) {
    this.dataManager.sendFilterString(value)
  }

  createReport() {
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Question 1',
        text: 'Enter the start date in the format: "YYYY-MM-DD"'
      },
      {
        title: 'Question 2',
        text: 'Enter the end date in the format: "YYYY-MM-DD"'
      },
      {
        title: 'Question 3',
        text: 'Would like to send the report to additional parties? Enter emails below seperated by commas.'
      }
    ]).then((result: any) => {
      if (result.value) {
        Swal.fire(
          'Success!',
          'Your requested report is being reviewed by a specialist and generated. Please allow up 24 hours!',
          'success'
        )
      }
    })
  }
  
}
