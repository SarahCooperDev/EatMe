import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashDialogComponent } from './dash-dialog.component';

describe('DashDialogComponent', () => {
  let component: DashDialogComponent;
  let fixture: ComponentFixture<DashDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
