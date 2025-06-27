import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscProfileSettingsComponent } from './misc-profile-settings.component';

describe('MiscSettingsComponent', () => {
  let component: MiscProfileSettingsComponent;
  let fixture: ComponentFixture<MiscProfileSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiscProfileSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiscProfileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
