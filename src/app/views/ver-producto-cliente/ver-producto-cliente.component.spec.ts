import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerProductoClienteComponent } from './ver-producto-cliente.component';

describe('VerProductoClienteComponent', () => {
  let component: VerProductoClienteComponent;
  let fixture: ComponentFixture<VerProductoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerProductoClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerProductoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
