import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PersonsService {
    people = [
        {name: 'Juan', age: '22', country: 'ES'},
        {name: 'Juan2', age: '24', country: 'UK'},
        {name: 'Juan3', age: '23', country: 'FR'},
    ];

    constructor(private http: HttpClient) {
    }

    get_all_persons() {
        return this.http.get('http://localhost:80/careers');
    }
    get_person_by_name(name)
    {
        let people_name = [];

        for(let i = 0; i < this.people.length ; i++)
        {
            if (this.people[i].name == name)
                people_name.push(this.people[i]);
        }

        return people_name;
    }
}
