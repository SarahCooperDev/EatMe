import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveImagesComponent } from './archive-images.component';

describe('ArchiveImagesComponent', () => {
  let component: ArchiveImagesComponent;
  let fixture: ComponentFixture<ArchiveImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
