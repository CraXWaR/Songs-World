import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISong } from '../shared/interfaces/songInterface';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http: HttpClient) { }

  addSong(data: {}) {
    return this.http.post(`${API_URL}/songs`, data);
    
  }

  getAllSongs() {
    return this.http.get<ISong[]>(`${API_URL}/songs`);
    
  }

  getMostExpnesiveSongs() {
    return this.http.get<ISong[]>(`${API_URL}/songs/most`);

  }
}
