import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';
// import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  // host: {
  //   '[@flyInOut]': 'true',
  //   'style': 'display: block;'
  // },
  // animations: [
  //   flyInOut(),
  //   expand()
  // ]
})
export class FavoritesComponent implements OnInit {

  favorites: Favorite;
  delete: boolean;
  errMess: string;

  constructor(private favoriteService: FavoriteService,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.favoriteService.getFavorites()
      .subscribe(favorites => this.favorites = favorites,
        errmess => this.errMess = (errmess as any));
  }

  deleteFavorite(id: string) {
    console.log('Deleting Favorite Book ' + id);
    this.favoriteService.deleteFavorite(id)
      .subscribe(favorites => this.favorites = (favorites as Favorite),
        errmess => this.errMess = (errmess as any));
    this.delete = false;
  }

}
