import { Component, OnInit } from '@angular/core';
import { DndApiService } from '../services/dnd-api.service';
import { APISpells } from '../dnd-apiresponse';

@Component({
  selector: 'app-spells',
  templateUrl: './spells.component.html',
  styleUrls: ['./spells.component.css'],
  providers: [DndApiService]
})
export class SpellsComponent implements OnInit {

  spellData:APISpells;
  favouriteData:APISpells[];
  errorMessage:any;

  constructor(private _dndApiService:DndApiService) { }

  ngOnInit(): void {
  }

  getSpellDetails(spellName:string) : boolean {
    spellName = spellName.replace(/\s+/g, '-').toLowerCase();
    
    console.log(spellName);
    this._dndApiService.getSpellData(spellName).subscribe(
      spellData => {
        this.spellData=spellData;
        console.log('Spell Name ' + this.spellData.name);
      },
      error => this.errorMessage = <any>error
    );
    return false;
  }

  favouriteSpell(spellData:APISpells){
    this._dndApiService.favouriteSpell(spellData);
  }

  getFavSpell(){
    this._dndApiService.getFavouriteSpell().subscribe(favData =>
      this.favouriteData = favData);
  }

}
