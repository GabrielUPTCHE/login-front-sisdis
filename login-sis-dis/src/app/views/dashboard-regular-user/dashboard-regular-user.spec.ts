import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRegularUser } from './dashboard-regular-user';

describe('DashboardRegularUser', () => {
  let component: DashboardRegularUser;
  let fixture: ComponentFixture<DashboardRegularUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRegularUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRegularUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
