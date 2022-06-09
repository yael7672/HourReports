import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip } from 'chart.js';

@Component({
  selector: 'app-statistics-graph',
  templateUrl: './statistics-graph.component.html',
  styleUrls: ['./statistics-graph.component.css']
})
export class StatisticsGraphComponent implements OnInit {
 
  constructor() {
    Chart.register(BarElement, BarController, CategoryScale, Decimation, Filler, Legend, Title, Tooltip);
  }
  ngOnInit(): void {
    const myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          }, y1: {
            type: 'linear',
            display: true,
            position: 'right'}
        }
      }
    });
  }
  }
  