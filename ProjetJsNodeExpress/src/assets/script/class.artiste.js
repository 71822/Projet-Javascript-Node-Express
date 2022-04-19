//EXPORT DEFAULT POUR PERMETTRE D'EXPORTER LA CLASS
export default class Artiste {

    _id;
    _title;
    _description;
    _genre;
    _video;

    //constructor est une méthode qui permet de créer initialiser les objet créés avec une classe.
    constructor(id, title, description, genre, video) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._genre = genre;
        this._video = video;
    }

    //accesseur : méthode qui permet de récupérer un contenu comme si on lisait une propriété
    get id() {
        return this._id;
    }
    //mutateur : méthode qui permet d'affecter un contenu comme si on affectait une propriété
    set id(tmp) {
        this._id = tmp;
    }


    get title() {
        return this._title;
    }
    set title(tmp) {
        this._title = tmp;
    }


    get description() {
        return this._description;
    }
    set description(tmp) {
        this._description = tmp;
    }


    get genre() {
        return this._genre;
    }
    set genre(tmp) {
        this._genre = tmp;
    }


    get video() {
        return this._video;
    }
    set video(tmp) {
        this._video = tmp;

    }

}






