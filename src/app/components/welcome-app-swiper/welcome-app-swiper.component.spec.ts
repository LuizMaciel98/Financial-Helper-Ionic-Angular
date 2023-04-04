import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WelcomeAppSwiperComponent } from './welcome-app-swiper.component';

describe('WelcomeAppSwiperComponent', () => {
  let component: WelcomeAppSwiperComponent;
  let fixture: ComponentFixture<WelcomeAppSwiperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeAppSwiperComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeAppSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
