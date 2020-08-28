import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {
  encounters: any
  filterSubject: Subject<string> = new Subject<string>()
  searchFilter
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  API_BASE = 'http://localhost:3000/api/'

  constructor(private http: HttpClient, private router: Router) { }

  async initEncounters() {
    let encounters = await this.http.get(this.API_BASE + 'encounters', this.httpOptions).toPromise()
    if (!!encounters) {
      this.encounters = this.formatEncounters(encounters)
      return true
    } else {
      return false
    }
  }

  getSearchFilter() {
    return this.searchFilter
  }

  sendFilterString(string) {
    if(!this.router.url.includes('encounters')) {
      this.router.navigate(['/encounters'])
    }
    this.searchFilter = string
    this.filterSubject.next(string)
  }

  async getEncounters() {
    if (!!this.encounters && this.encounters.length > 0) {
      return this.encounters
    } else {
      let encounters = await this.http.get(this.API_BASE + 'encounters', this.httpOptions).toPromise()
      if (!!encounters) {
        this.encounters = this.formatEncounters(encounters)
        return this.encounters
      } else {
        return null
      }
    }
  }

  formatEncounters(encounters) {
    encounters = encounters.map((ele) => {
      ele.date = new Date(ele.date).toDateString()
      ele.time = this.formatAMPM(new Date(ele.time))
      return ele
    })

    encounters = encounters.sort(function(a,b){return new Date(a.date).getTime() - new Date(b.date).getTime()});
    encounters = encounters.reverse()
    return encounters
  }


  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  async deleteEncounter(uid) {
    await this.http.post(this.API_BASE + 'delete-encounters', { uid: uid }, this.httpOptions).toPromise()
    this.encounters = this.encounters.filter((ele) => {
      return ele.uid != uid
    })
  }

  async addEncounter(body) {
    let encounterAdded = await this.http.post(this.API_BASE + 'add-encounters', body, this.httpOptions).toPromise()
    if(encounterAdded) {
      this.encounters.push(body)
      return true
    }else {
      return false
    }
  }

  getTotalEncounterCount() {
    return this.encounters.length
  }

  getEncounters30Days() {
    let count = 0
    for (let i = 0; i < this.encounters.length; i++) {
      if (this.numDaysBetween(new Date(), new Date(this.encounters[i].date)) <= 30) {
        count++
      }
    }

    return count
  }

  numDaysBetween(d1, d2) {
    var diff = Math.abs(d1.getTime() - d2.getTime());
    console.log(diff / (1000 * 60 * 60 * 24))
    return diff / (1000 * 60 * 60 * 24);
  };

  getDashboardDataPoints() {
    const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let dataPoints = []
    let labelPoints = []
    let dateIncr = new Date()
    for(let z = 0; z < 7; z++) {
      dateIncr.setDate(dateIncr.getDate() - z)
      let count = 0
      for (let i = 0; i < this.encounters.length; i++) {
        if(Math.floor(this.numDaysBetween(dateIncr, new Date(this.encounters[i].date))) == z) {
          console.log('ainin')
          count++
        }
      }
      let key = DAYS_OF_WEEK[dateIncr.getDay()]
      dataPoints.unshift(count)
      labelPoints.unshift(key)
      dateIncr = new Date()
    }
    return {label: labelPoints, data: dataPoints}
  }
}
