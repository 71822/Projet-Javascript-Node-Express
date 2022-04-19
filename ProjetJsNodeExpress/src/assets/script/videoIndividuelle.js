//IMPORT DE LA FUNCTION navigation() DU FICHIER function.js
import { navigation, video } from "./function.js";
navigation();


//RECUPERATION DE L'ID S'IL Y EN A UN ET SUPPRESSION DU DIESE AFIN QU'IL SOIT UTILISABLE PLUS BAS
let myId = window.location.hash.split('#')[1];


//FETCH EN GET POUR RECUPERER LES DONNEES CORRESPONDANT A LA VIDEO CLIQUEE GRACE A L'ID
let myHeaders = new Headers();
let url = `/videoIndividuelle/${myId}`;
let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(url, options)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    })
    .then((response) => {
        let genre = document.querySelector('h1');
        genre.style.textDecoration = 'underline';
        let title = document.querySelector('h2');
        title.style.fontSize = '25px';
        title.style.textAlign = 'center';
        title.style.margin = '20px';
        let containerList = document.querySelector('article');
        containerList.style.margin = '0 auto';
        containerList.style.width = '80%';
        let myDivCardArtiste = document.createElement('div');
        let myDivVideo = document.createElement('div');
        let myDivDescription = document.createElement('div');
        myDivDescription.style.textAlign = 'justify';
        myDivDescription.style.marginTop = '30px';
        myDivDescription.style.marginBottom = '50px';

        genre.innerText = `${response._genre}`;
        title.innerText = `${response._title}`;

        let linkToChange = response._video;
        myDivVideo.innerHTML = video(linkToChange, '100%', '400px');
        myDivDescription.innerHTML = `<strong>Description:</strong><br/> ${response._description}`;
        containerList.appendChild(myDivCardArtiste);
        myDivCardArtiste.appendChild(genre);
        myDivCardArtiste.appendChild(title);
        myDivCardArtiste.appendChild(myDivVideo);
        myDivCardArtiste.appendChild(myDivDescription);
    })
    .catch((err) => {
        console.log('Error fetch /liste', err);
    });
