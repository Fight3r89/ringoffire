import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRulesComponent } from './dialog-rules.component';

describe('DialogRulesComponent', () => {
  let component: DialogRulesComponent;
  let fixture: ComponentFixture<DialogRulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRulesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
