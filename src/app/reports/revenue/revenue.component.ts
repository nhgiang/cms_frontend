import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportsApiService } from '@shared/api/reports.api.service';
import * as fns from 'date-fns';
import { sum } from 'lodash-es';
import { map } from 'rxjs/operators';
import { getMonth, getYear } from 'date-fns';
@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.scss']
})
export class RevenueComponent implements OnInit {

  form: FormGroup;
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: false,
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
          padding: 10,
          callback: this.customLabelX.bind(this)
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
          stepSize: 5000000,
          display: true,
          beginAtZero: true,
          fontSize: 13,
          padding: 20,
          callback: this.customLabelY
        }
      }]
    },
    options: {
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    }
  };
  barChartLabels: string[] = [];
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
      data: [],
      label: 'Doanh thu',
      categoryPercentage: 0.35,
      barPercentage: 0.50,
    },
  ];
  inlinePlugins: any = {
    tooltip: {
      enabled: false
    }
  }
  totalMoney: string;
  constructor(
    private fb: FormBuilder,
    private reportsApiService: ReportsApiService
  ) {
    this.form = this.fb.group({
      mode: ['Date'],
      startDate: [fns.subYears(new Date, 1).toISOString()],
      endDate: [new Date().toISOString()]
    });

  }

  ngOnInit() {
    this.form.valueChanges.pipe(map(val => {
      return { mode: val.mode, startDate: new Date(val.startDate).toISOString(), endDate: new Date(val.endDate).toISOString() };
    })).subscribe(val => {
      if (val.startDate && val.endDate) {
        this.getData(val);
      }
      return val;
    });
    this.getData(this.form.value);
  }

  getData(val) {
    this.reportsApiService.getRevenue(val).subscribe((res: any[]) => {
      let totalAmount = res.map(x => Number(x.totalAmount));
      this.barChartData = [{
        data: totalAmount,
        label: 'Doanh thu',
        categoryPercentage: 0.35,
        barPercentage: 0.80,
      }];
      this.totalMoney = this.formatCurrency('vi-VN', sum(totalAmount));
      this.barChartLabels = res.map(x => fns.format(new Date(x.date), 'dd/MM/yyyy'));
    });
  }

  customLabelY(label, index, labels) {
    let string = JSON.stringify(label);
    if (string.length > 9) {
      return `${string.slice(0, string.length - 9)} tỉ ${(string.slice(string.length - 9, string.length - 6) === '000') ? '' : string.slice(string.length - 9, string.length - 6) + ' triệu'}`;
    } else if (string.length > 6) {
      return string.slice(0, string.length - 6) + ' triệu';
    } else {
      return string;
    }
  }

  customLabelX(label, index, labels) {
    if (this.form?.get('mode')?.value === 'Month') {
      const date = label.split('/');
      return `Tháng ${getMonth(new Date(date[2], date[1], date[0])) + 1}/${getYear(new Date(date[2], date[1], date[0]))}`;
    }
    return label;
  }

  customToolTip(label, index) {
    console.log(label, index);
  }

  formatCurrency(locate: string, value: number) {
    return new Intl.NumberFormat(locate).format(value).replace(/\./g, ',');
  }

}
