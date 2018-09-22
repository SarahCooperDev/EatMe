import { Component, OnInit, Input } from '@angular/core';
import { ComparisonService } from '../services/comparison.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css']
})
export class CompareComponent implements OnInit {

  @Input() inWord: String;

  feedback = '';

  constructor(private compService: ComparisonService, private router: Router) { }

  ngOnInit() {
  }

  checkWord(){
    console.log("Checking word");
    this.compService.checkWord(this.inWord).subscribe(result =>{
      console.log("Hit subscribe");
      var data = <any>result;
      console.log("Result is " + data.result);
      if(data.status == 200){
        this.feedback = data.result;
      }
    });
  }

}
