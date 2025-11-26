import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCar } from './product-car';

describe('ProductCar', () => {
  let component: ProductCar;
  let fixture: ComponentFixture<ProductCar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
