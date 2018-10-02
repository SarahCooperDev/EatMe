import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashImagesComponent } from './dash-images.component';

describe('DashImagesComponent', () => {
  let component: DashImagesComponent;
  let fixture: ComponentFixture<DashImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
