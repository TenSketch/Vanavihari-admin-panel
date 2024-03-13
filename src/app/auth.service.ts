import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private accessUsername = 'username';
  private accessUserFullname = 'userfullname';
  private apiCommonUrl = 'https://www.zohoapis.com/creator/custom/vanavihari';
  
  private bookingRooms = 'booking_rooms';
  private searchData = 'search_data';
  constructor(private http: HttpClient) { }

  sendDataToServer(apiUri: any, params: any): Observable<any> {
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json'
    // });
    return this.http.get<any>(`${this.apiCommonUrl}/${apiUri}`, { params });
  }

  setAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  setAccountUsername(username: string): void {
    localStorage.setItem(this.accessUsername, username);
  }

  setAccountUserFullname(userfullname: string): void {
    localStorage.setItem(this.accessUserFullname, userfullname);
  }

  getAccountUsername(): string | null {
    return localStorage.getItem(this.accessUsername);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getUserFullName(): string | null {
    return localStorage.getItem(this.accessUserFullname);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }


  setBookingRooms(rooms: any[]): void {
    localStorage.setItem(this.bookingRooms, JSON.stringify(rooms));
  }
  getBookingRooms(): any | null {
    const roomsJson = localStorage.getItem(this.bookingRooms);
    if (roomsJson) {
      return JSON.parse(roomsJson);
    }
    return null;
  }
  clearBookingRooms(): void {
    localStorage.removeItem(this.bookingRooms);
  }

  setSearchData(data: any[]): void {
    localStorage.setItem(this.searchData, JSON.stringify(data));
  }
  getSearchData(): any | null {
    const searchDataJson = localStorage.getItem(this.searchData);
    if (searchDataJson) {
      return JSON.parse(searchDataJson);
    }
    return null;
  }
  clearSearchData(): void {
    localStorage.removeItem(this.searchData);
  }
}
