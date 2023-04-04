import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, Navigation } from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, IonicSlides, Navigation]);

@Component({
  selector: 'app-welcome-app-swiper',
  templateUrl: './welcome-app-swiper.component.html',
  styleUrls: ['./welcome-app-swiper.component.scss'],
})
export class WelcomeAppSwiperComponent implements OnInit {

  @Output() toggleWelcomeModalEvent = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  toggleWelcomeModal() {
    console.log('toggleWelcomeModal');
    this.toggleWelcomeModalEvent.emit();
  }

}
