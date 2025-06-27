import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor() { }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 86400000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  get adminEnabled(){
    return this.getCookie('admin_enabled') === 'true';
  }

  setAdminMode(enabled: boolean){
    this.setCookie('admin_enabled', enabled.toString(), 7);
  }

}
