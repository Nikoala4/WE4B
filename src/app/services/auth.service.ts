import { Injectable } from '@angular/core';

export enum Role {
  admin,
  teacher_admin,
  teacher,
  student
}

export type UserData =  { name: string; surname: string; role: Role }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getCurrentUser(): UserData | null {
    return null;
  }

  getUserImage(): string {
    return 'iVBORw0K...'; 
  }
}
