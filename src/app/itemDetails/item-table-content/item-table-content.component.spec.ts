import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableContentComponent } from './item-table-content.component';

describe('ItemTableContentComponent', () => {
  let component: ItemTableContentComponent;
  let fixture: ComponentFixture<ItemTableContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTableContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTableContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
