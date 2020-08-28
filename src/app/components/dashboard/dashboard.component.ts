import { Component, OnInit, AfterViewInit } from '@angular/core';
declare let feather:any;
import Chart from "chart.js";
import { DataManagerService } from 'src/app/_services/data-manager.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  encountersChart: any
  gradientChartOptionsConfigurationWithTooltipGreen: any = {
    maintainAspectRatio: false,
    legend: {
      display: false
    },

    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: "rgba(29,140,248,0.0)",
            zeroLineColor: "transparent"
          },
          scaleLabel: {
            display: true,
            labelString: 'Encounters'
          },
          ticks: {
            beginAtZero: true,
            callback: function(value) {if (value % 1 === 0) {return value;}},
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ],

      xAxes: [
        {
          barPercentage: 1.6,
          scaleLabel: {
            display: true,
            labelString: 'Days Of Week'
          },
          gridLines: {
            drawBorder: false,
            color: "rgba(0,242,195,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  };
  canvas: any;
  ctx;
  last30DaysCount = 0
  totalEncountersCount = 0
  constructor(private dataManager: DataManagerService) { }
  
  ngAfterViewInit(): void {
    feather.replace()
  }

  async ngOnInit() {
    feather.replace()
    let init = await this.dataManager.initEncounters()
    if(!init) {
      Swal.fire({
        title: 'Error Occurred',
        text: "Could not fetch user encounters. Please Try again!",
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Try Again!'
      })
    } else {
      this.last30DaysCount = this.dataManager.getEncounters30Days()
      this.totalEncountersCount = this.dataManager.getTotalEncounterCount()
    }
    this.initializeChart()
  }

  initializeChart() {
    if(this.encountersChart) {
      this.encountersChart.clear()
      this.encountersChart.destroy()
    }
    let dataLabelsPoints = this.dataManager.getDashboardDataPoints()
    this.canvas = document.getElementById("chartJS");
    this.ctx = this.canvas.getContext("2d");

    let gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, "rgba(127, 66, 134, 0.15)");
    gradientStroke.addColorStop(0.4, "rgba(127, 66, 134, 0)");
    gradientStroke.addColorStop(0, "rgba(127, 66, 134,0)");

    let data = {
      labels: dataLabelsPoints.label,
      datasets: [
        {
          label: "# Of Triggers",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#00f2c3",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#00f2c3",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#00f2c3",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: dataLabelsPoints.data
        }
      ]
    };

    this.encountersChart = new Chart(this.ctx, {
      type: "line",
      data: data,
      options: this.gradientChartOptionsConfigurationWithTooltipGreen
    });

    const simulateWindowResize = setInterval(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);

    setTimeout(() => {
      clearInterval(simulateWindowResize);
    }, 500);
  }



}
