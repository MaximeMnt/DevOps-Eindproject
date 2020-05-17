import { Component, OnInit } from '@angular/core';
import { ApiService, ITrack, IArtist, IChuckNorris } from '../../services/api.service';
import { AuthService } from '../../services/auth.service'
import { interval } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {


  constructor(public auth: AuthService, public api: ApiService) {
      interval(2000).subscribe(x => {
        this.refreshData();
      });
  }
  public tracks: ITrack;
  public artists: IArtist;
  public joke: IChuckNorris;
  ngOnInit() {
  }

  refreshData(){
    this.getTracks();
    this.getArtists();
  }

  getTracks() {
    this.api.getTracks().subscribe(tracks => {
      //console.log(tracks);
      this.tracks = tracks;

      //console.log(this.tracks[0].artists[0].artist.name);
    })
  }

  getArtists(){
    this.api.getArtists().subscribe(artists=>{
      this.artists = artists;
    })
  }

  showJoke(){
    this.api.getChuckNorris().subscribe(joke => {
      this.joke = joke;
    })
  }

}
