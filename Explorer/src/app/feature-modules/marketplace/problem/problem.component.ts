import { Component } from '@angular/core';
import { Problem } from '../model/problem.model';

@Component({
  selector: 'xp-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent {
  problem: Problem[]=[{id:0, category: "Duzina ture", priority:"Visok", description: "Predugio trajala", time: {hours:12, minutes:0} },
{id:1, category: "Trajanje ture", priority:"Bez", description: "Kratka", time: {hours:13, minutes:0}}]
  
  
}
