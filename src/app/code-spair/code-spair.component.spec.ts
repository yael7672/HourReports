import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeSpairComponent } from './code-spair.component';

describe('CodeSpairComponent', () => {
  let component: CodeSpairComponent;
  let fixture: ComponentFixture<CodeSpairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeSpairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeSpairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
