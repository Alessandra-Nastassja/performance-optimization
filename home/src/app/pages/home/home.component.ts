import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private home: HomeService) {}

  ngOnInit() {
    this.home.getHome().subscribe((response) => {
      // console.log('response ->', response);
    })
  }
}
