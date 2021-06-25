import { Component, OnInit } from '@angular/core';
import { OccupationsAnalyticsApiService } from '@shared/api/occupations-analytics.api.service';
import { finalize } from 'rxjs/operators';

interface OccupationsAnalytics {
  name: string;
  totalStudents: number;
}
@Component({
  selector: 'app-occupations-analytics',
  templateUrl: 'occupations.component.html',
})
export class OccupationsAnalyticsComponent implements OnInit {
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: false,
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Nghề nghiệp',
          },
          gridLines: {
            drawBorder: true,
            offsetGridLines: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [3, 4],
            zeroLineWidth: 1,
            zeroLineBorderDash: [3, 4],
            color: 'rgb(0 0 0)',
          },
          ticks: {
            display: true,
            beginAtZero: true,
            fontSize: 13,
            padding: 10,
            color: 'rgb(0 0 0)',
            //callback: this.customLabelX.bind(this),
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Số lượng học viên',
          },
          gridLines: {
            drawBorder: true,
            offsetGridLines: false,
            drawOnChartArea: false,
            drawTicks: false,
            borderDash: [3, 4],
            zeroLineWidth: 1,
            zeroLineBorderDash: [3, 4],
            color: 'rgb(0 0 0)',
          },
          ticks: {
            stepSize: 5,
            display: true,
            beginAtZero: true,
            fontSize: 13,
            padding: 20,
            color: '#fff',
            //callback: this.customLabelY,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      displayColors: false,
      xPadding: 15,
      yPadding: 15,
      // callbacks: {
      //   label: this.customToolTipLabel.bind(this),
      //   title: this.customToolTipTitle.bind(this),
      // },
    },
  };
  barChartLabels: string[] = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartColors: Array<any> = [
    {
      backgroundColor: '#1890ff',
      borderWidth: 0,
    },
  ];
  barChartData: any[] = [
    {
      data: [],
      label: 'Số lượng học viên',
      categoryPercentage: 0.35,
      barPercentage: 0.5,
    },
  ];
  inlinePlugins: any = {
    tooltip: {
      enabled: false,
    },
  };

  isLoading = false;
  constructor(private api: OccupationsAnalyticsApiService) {}
  ngOnInit() {
    this.getAnalytics();
  }

  getAnalytics(param?: string) {
    this.isLoading = true;
    this.api
      .get()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((data: OccupationsAnalytics[]) => {
        const totalStudents = data.map((x) => x.totalStudents);
        this.barChartData = [
          {
            data: totalStudents,
            label: 'Số lượng học viên',
            categoryPercentage: 0.4,
            barPercentage: 0.8,
          },
        ];
        this.barChartLabels = data.map((x) => x.name);
      });
  }
}
