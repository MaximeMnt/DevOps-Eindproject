import { Component, OnInit } from '@angular/core';
import { ApiService, IArtist, ITrack } from '../services/api.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { interval } from 'rxjs';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { delay } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CRUDComponent implements OnInit {

  public Selected;
  firstFieldCreated: boolean = false;

  myForm: FormGroup;
  selectedArtist: any;

  constructor(public api: ApiService, private fb: FormBuilder, public auth: AuthService) {
    this.getArtists();
    this.getTracks();
    // interval(2000).subscribe(x => {
    //   if(this.Selected=="Delete")
    //   this.getTracks();
    //   this.getArtists();
    //   console.log("Refresh!")
    // });
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      socials: this.fb.array([])
    })
    this.myForm.valueChanges.subscribe(console.log);
  }

  //  --CREATE--
  get ArtistForms() {
    return this.myForm.get('socials') as FormArray
  }

  addField() {
    this.firstFieldCreated = true;
    const phone = this.fb.group({
      url: [],
    });

    this.ArtistForms.push(phone);
  }

  deleteURL(i) {
    this.ArtistForms.removeAt(i);
  }

  CreateTrack(title, album, genre, year, bpm, key) {
    console.log(this.selectedArtist);

    var body = {
      title: title,
      album: album,
      genre: genre,
      year: year,
      bpm: bpm,
      key: key,
      // artists: [{
      //   artistID: this.selectedArtist.artistID,
      //   name: this.selectedArtist
      // }]
    }

    this.api.createTrack(body).subscribe(success => {
      console.log(success);
    });
    console.log(JSON.stringify(body));
    //TODO: Eerst converteren naar JSON: Dan pas kunnen we een nieuwe track sturen naar de db
    //juiste formaat:
    //   {
    //     title: "on my mind",
    //     album: "Soulswing flips",
    //     genre: "Hip/Hop",
    //     year: 2018,
    //     bpm: 75,
    //     key: "Bbm",
    //     artists: [
    //       {
    //             artist: {
    //                 Name: "Tera Kòrá",
    //                 socials: [
    //                            {
    //                                url: "http://terakora.bandcamp.com",
    //                                url: "https://soundcloud.com/tera-kora",
    //                                url: "https://www.instagram.com/terakoraa/"
    //                            }]
    //             }
    //         }
    //     ]
    // }

  }

  CreateArtist(Artistname) {
    var body = {
      name: Artistname,
      socials: this.ArtistForms.value
    }

    this.api.createArtist(body).subscribe(track => {
      console.log(track);
    });
  }

  // --END CREATE--

  // -- READ -- 
  public selectedSearch: any
  public artists: IArtist;
  public tracks: ITrack;
  public SearchKeyWord: string;
  public trackSearchResults: ITrack;

  public length;
  public page;
  public sortType;
  public sortMethod;
  getArtists() {
    this.api.getArtists().subscribe(artists => {
      this.artists = artists;
    })
  }


  getTracks() {
    this.api.getTracks().subscribe(tracks => {
      this.tracks = tracks;
    })
  }

  getPageTracks() {
    this.api.getTracksPage(this.page, this.length).subscribe(tracks => {
      this.tracks = tracks;
    })
  }
  getTracksSearchResults() {
    this.api.SearchTracks(this.selectedSearch, this.SearchKeyWord).subscribe(tracks => {
      this.tracks = tracks;
    })
  }

  sortResults() {
    this.api.SortTracks(this.sortType, this.sortMethod).subscribe(tracks => {
      this.tracks = tracks;
    })
  }

  deleteTrack(track: ITrack) {
    this.api.deleteTrack(track).subscribe(tracks => {
      this.tracks = tracks;
    });
  }

  deleteArtist(artist: IArtist) {
    if (artist.socials.length == 0) {
      this.api.deleteArtist(artist).subscribe(artists => {
        this.artists = artists;
      });
    } else {
      artist.socials.forEach(element => {
        this.api.deleteSocials(element.urlID).subscribe(blabla =>{
          console.log(blabla);
        });
      });

      setTimeout(fucntion => {
        this.api.deleteArtist(artist).subscribe(artists =>{
          this.artists = artists;
        })
      },250);
      
    }





  }

  public Refresh() {
    this.getTracks();
    this.getArtists();
  }

  updateArtist: string = "";
  Update(track, title, Album, Genre, Year, BPM, Key) {
    let finTitle, finAlbum, finGenre, finYear, finBPM, finKey, finArtist;

    if (!title) {
      finTitle = track.title;
    } else finTitle = title;

    if (!Album) {
      finAlbum = track.album;
    } else finAlbum = Album;

    if (!Genre) {
      finGenre = track.genre;
    } else finGenre = Genre;

    if (!Year) {
      finYear = track.year;
    } else finYear = Year;

    if (!BPM) {
      finBPM = track.bpm
    } else finBPM = BPM;

    if (!Key) {
      finKey = track.key
    } else finKey = Key;

    var body = {

      title: finTitle,
      album: finAlbum,
      genre: finGenre,
      year: finYear,
      bpm: finBPM,
      key: finKey,
      // artists: [
      //   {
      //     artist: {
      //       name: finArtist
      //     }
      //   }
      // ]

    };
    // var artistBody = {
    //   name: finArtist,
    //   //socials: track.artist.socials,
    //   //tracks: track.artist.tracks
    // }
    this.api.UpdateTrack(track, body).subscribe(success => {
      console.log(success);
    });
    // this.api.UpdateArtist(track.artist, body).subscribe(success => {
    //   console.log(success);
    // });

  }
}

