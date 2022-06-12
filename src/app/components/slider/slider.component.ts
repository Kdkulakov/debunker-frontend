import {Component, OnInit, ViewEncapsulation, Input} from '@angular/core';

// import Swiper core and required modules
import SwiperCore, {Navigation, Pagination, } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);
// install Swiper modules
SwiperCore.use([Navigation]);


// Кастомная шаблон-компонента слайдер
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SliderComponent implements OnInit {

  @Input()
  images: string[];

  constructor() {
  }

  ngOnInit() {
  }
}
