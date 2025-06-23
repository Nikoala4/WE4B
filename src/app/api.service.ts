import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  api = "http://localhost:8622"
  constructor() { }
  async login(email: String, password: String){
    return await fetch(this.api+"/connection/login",
      {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'//,
                    //'Access-Control-Allow-Origin': 'https://api.nooble-angular.flopcreation.fr'

                },
                body: JSON.stringify({
                    username: email,
                    password: password
                })
            }
    )
  }
}
