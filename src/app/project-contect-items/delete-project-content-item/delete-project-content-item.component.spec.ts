import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProjectContentItemComponent } from './delete-project-content-item.component';

describe('DeleteProjectContentItemComponent', () => {
  let component: DeleteProjectContentItemComponent;
  let fixture: ComponentFixture<DeleteProjectContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProjectContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProjectContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
