import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabNavMenuComponent } from './tab-nav-menu.component';

describe('TabNavMenuComponent', () => {
  let component: TabNavMenuComponent;
  let fixture: ComponentFixture<TabNavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabNavMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabNavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
