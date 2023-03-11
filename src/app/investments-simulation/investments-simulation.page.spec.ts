import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestmentsSimulationPage } from './investments-simulation.page';

describe('InvestmentsSimulationPage', () => {
  let component: InvestmentsSimulationPage;
  let fixture: ComponentFixture<InvestmentsSimulationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentsSimulationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentsSimulationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
