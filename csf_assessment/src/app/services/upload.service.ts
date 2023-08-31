import { State, TagCount } from 'src/app/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  state: State = { minutes: 0, tagList: [] };
  doNotLoad: boolean = false;

  upload(form: FormData) {
    // const form = new FormData();
    // form.set("image", file);

    return firstValueFrom(this.httpClient.post<any>('/api/upload', form));
}

  getTags(minutes: number) {
    const params: HttpParams = new HttpParams().set("minutes", minutes);
    return firstValueFrom(this.httpClient.get<any>('/api/home', { params }));
  }

  getDetails(tag:string, minutes:number) {
    const params: HttpParams = new HttpParams()
      .set("tag", tag).set("minutes", minutes);
      return firstValueFrom(this.httpClient.get<any>('/api/details', { params }));
  }

  saveState(minutes: number, tagList: TagCount[]) {
    this.state.minutes = minutes;
    this.state.tagList = tagList;
  }

  loadState(): State {
    return this.state;
  }
}
