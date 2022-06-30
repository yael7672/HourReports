import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProjectContectItemsComponent } from './my-project-contect-items.component';

describe('MyProjectContectItemsComponent', () => {
  let component: MyProjectContectItemsComponent;
  let fixture: ComponentFixture<MyProjectContectItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProjectContectItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProjectContectItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
