import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndSortTasksComponent } from './search-and-sort-tasks.component';

describe('SearchAndSortTasksComponent', () => {
  let component: SearchAndSortTasksComponent;
  let fixture: ComponentFixture<SearchAndSortTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAndSortTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndSortTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
