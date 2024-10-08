import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const myChart = new Chart("myChart", {    
        type: 'line',
        data: {
            labels: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',        
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            },
            {
                label: '# of Votes',
                data: [22, 20, 13, 15, 12, 13],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                  
                ],
                borderColor: [
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    }

}
