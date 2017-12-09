import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooktradeComponent } from './booktrade.component';

describe('BooktradeComponent', () => {
  let component: BooktradeComponent;
  let fixture: ComponentFixture<BooktradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooktradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooktradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
