import { Injectable } from '@angular/core';
import { Account } from '../../nooble/api-objs/Account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getCurrentUser(): Account | null {
    return null;
  }

  getUserImage(): string {
    return 'iVBORw0K...'; 
  }
}
