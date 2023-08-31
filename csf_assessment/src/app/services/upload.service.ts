import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

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


}
