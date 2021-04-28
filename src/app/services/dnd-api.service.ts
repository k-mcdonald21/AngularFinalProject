import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, ObservableInput } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { APISpells } from "../dnd-apiresponse";

import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DndApiService {

  spellDataCollection:AngularFirestoreCollection<APISpells>;

  favData:Observable<APISpells[]>;

  private _siteURL="https://www.dnd5eapi.co/api/spells/";

  constructor(private _http:HttpClient, private _afs:AngularFirestore) { 

    this.spellDataCollection = _afs.collection<APISpells>("fav-spells");
  }

  getSpellData(spell:string): Observable<APISpells> {
    return this._http.get<APISpells>(this._siteURL + spell + "/")
    .pipe(
      tap(data => console.log(data)
      ),
      catchError(this.handleError)
    )
  }

  favouriteSpell(spell:APISpells): void {
    console.log('Adding spell to db...')
    this._afs.collection('fav-spells').doc(spell.index).set({
      spell: spell
    })
    .catch(e => {
      console.log(e);
    })
    console.log('Success');

    alert("Successfully saved spell!");
  }

  getFavouriteSpell(): Observable<APISpells[]> {
    console.log('Retrieving spells...')
    this.favData = this.spellDataCollection.valueChanges();
    console.log(this.favData);
    this.favData.subscribe(
      data => console.log(data),
      data => data = this.favData,
    )
    return this.favData;
  }

  private handleError(err:HttpErrorResponse) {
    console.log('DnD API: ' + err.message);
    alert("Error! Please try again.");
    return Observable.throw(err.message);
  }
}
