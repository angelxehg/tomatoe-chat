import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from './organization.service';
import { environment } from 'src/environments/environment';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  public workspaces: Observable<any>;
  private workspacesData = new BehaviorSubject(null);

  constructor(
    private http: HttpClient,
    private org: OrganizationService
  ) { }

  fetch() {
    return this.org.organization.pipe(
      take(1),
      map(org => {
        var url = `${environment.api_url}/organizations/${org}/workspaces/`;
        return this.http.get(url).subscribe({
          next: (data) => {
            this.workspacesData.next(data);
          },
          error: err => { }
        });
      })
    ).subscribe();
  }

  all() {
    return this.workspacesData.getValue();
  }
}