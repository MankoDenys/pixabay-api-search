import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  p: number = 1;
  pageSize = 5;
  empty: boolean = false;
  
  images: any=[];
  searchQuery!: string;
  imagesFound = false;
  searching = false;

  handleSuccess(data: any) {
    this.imagesFound = true;
    this.images = data.hits;
    if(this.images.length==0){
      this.empty = true;
    }
    console.log(data.hits);
  }


  handleError(error: any) {
    console.log(error);
  }

  constructor(private testService: TestService) { 
    this.images = [];
  }

  searchImages(query: string) {
    this.searching = true;
    if (query) {
      return this.testService.getImage(query).subscribe(
        data => this.handleSuccess(data),
        error => this.handleError(error),
        () => {(this.searching = false), this.searchQuery = ''; }
      );
      
    } 

  }

  ngOnInit(): void {
  }

}
