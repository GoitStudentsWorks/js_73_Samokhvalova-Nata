//OD - class for Genres: methods getSome(idArr) and getAll(idArr) to be used for obtaining genres string for cards

import { fetchGenres } from './fetchFromTheMovieDB';

class Genres {
  #genresAll;

  constructor() {
    this.#genresAll = {};
    this.fill();
  }

  getName(id) {
    // console.log(this.#genresAll);
    return this.#genresAll[id] || `Unknown genre(${id})`;
  }

  getSome(idArr) {
    const len = idArr.length;
    if (len === 0) return '';

    let n = [];
    for (let i = 0; i < Math.min(2, len); i += 1) {
      n.push(genres.getName(idArr[i]));
    }
    if (len > 2) n.push('Other');

    return n.join(', ');
  }

  getAll(idArr) {
    if (idArr.length === 0) return '';

    return idArr.map(e => genres.getName(e)).join(', ');
  }

  async fill() {
    try {
      const { genres } = await fetchGenres();
      //  console.log('fill Genres:', genres);
      genres.forEach(element => {
        this.#genresAll[element.id] = element.name;
      });
    } catch (error) {
      //TODO: notification with Notiflix.error
      console.log('ERROR! ', error);
    }
  }
}

export const genres = new Genres();
