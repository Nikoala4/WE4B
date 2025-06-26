import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageSelectorComponent } from './profile-image-selector.component';

describe('ProfileImageSelectorComponent', () => {
  let component: ProfileImageSelectorComponent;
  let fixture: ComponentFixture<ProfileImageSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileImageSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
