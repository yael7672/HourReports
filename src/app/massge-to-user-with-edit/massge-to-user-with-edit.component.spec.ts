import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassgeToUserWithEditComponent } from './massge-to-user-with-edit.component';

describe('MassgeToUserWithEditComponent', () => {
  let component: MassgeToUserWithEditComponent;
  let fixture: ComponentFixture<MassgeToUserWithEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassgeToUserWithEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassgeToUserWithEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
