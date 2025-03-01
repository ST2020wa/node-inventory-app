import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickStartComponent } from './quickStart.component';

describe('QuickStartComponent', () => {
  let component: QuickStartComponent;
  let fixture: ComponentFixture<QuickStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
