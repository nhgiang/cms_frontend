import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Month'
        },
        gridLines: false,
        ticks: {
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }],
      yAxes: [{
        display: true,
        scaleLabel: {
          display: false,
          labelString: 'Value'
        },
        gridLines: {
          drawBorder: false,
          offsetGridLines: false,
          drawTicks: false,
          borderDash: [3, 4],
          zeroLineWidth: 1,
          zeroLineBorderDash: [3, 4]
        },
        ticks: {
          max: 100,
          stepSize: 20,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 10
        }
      }]
    }
  };
  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2007', '2008', '2009', '2010', '2011', '2007', '2008', '2009', '2010', '2011', '2007', '2008', '2009', '2010', '2011', '2007', '2008', '2009', '2010', '2011', '2007', '2008', '2009', '2010', '2011'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartColors: Array<any> = [
    {
      backgroundColor: '#1890ff',
      borderWidth: 0
    }
  ];
  barChartData: any[] = [
    {
      data: [65, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55, 59, 80, 81, 56, 55],
      label: 'Series A',
      categoryPercentage: 0.35,
      barPercentage: 0.50,
    },
  ];

  form: FormGroup;
  constructor(
    private fb: FormBuilder,

  ) {
    this.form = this.fb.group({
      mode: [null],
      startDate: [null],
      endDate: [null]
    });
  }

  ngOnInit() {

  }

}
