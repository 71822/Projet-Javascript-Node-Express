//IMPORT DE LA FUNCTION navigation() DU FICHIER function.js
import { navigation, video } from "./function.js";
navigation();



//FETCH EN GET SUR LA ROUTE /liste DANS index.js POUR RECUPERER LES DONNEES DU FICHIER liste.js(dans data)
let myHeaders = new Headers();
let url = '/liste';
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
            //s'il y a une réponse et qu'elle est "ok", la réponse est envoyée en json
        }
        return Promise.reject(res);
        //Si la promesse est rompue, la raison sera passée en argument.
    })
    .then((response) => {

        //Si la réponse passe elle peut être traité ici
        response.forEach(artiste => {

            //Création du templete, des balises, et injection des données
            let containerList = document.querySelector('article');
            containerList.style.display = 'flex';
            containerList.style.flexDirection = 'row';
            containerList.style.flexWrap = 'wrap';
            containerList.style.justifyContent = 'space-around';
            let myDivCardArtiste = document.createElement('div');
            myDivCardArtiste.style.margin = '20px';
            myDivCardArtiste.style.border = '1px solid #DEDEDE';
            let myH2Title = document.createElement('h2');
            myH2Title.style.textAlign = 'justify';
            myH2Title.style.fontSize = '15px';
            myH2Title.style.width = '320px';
            myH2Title.style.height = '40px';
            let myDivVideo = document.createElement('div');
            let myDivA = document.createElement('div');
            myDivA.style.textAlign = 'right';
            myDivA.style.marginBottom = '20px';
            let myLinkDetail = document.createElement('a');
            myLinkDetail.classList.add("link")
            let myLinkUpdate = document.createElement('a');
            myLinkUpdate.classList.add("link")
            let myLinkDelete = document.createElement('a');
            myLinkDelete.classList.add("linkDelete")

            let myId = artiste._id;
            myH2Title.innerText = `${artiste._title}`;
            let linkToChange = artiste._video;
            myDivVideo.innerHTML = video(linkToChange, '320', '210');

            //lien vers la page artiste individuelle, setAttribute pour ajouter href puis le lien
            myLinkDetail.setAttribute('href', `./videoIndividuelle.html#${myId}`);
            myLinkDetail.innerText = 'Détails';

            //lien vers la page formulaire 
            myLinkUpdate.setAttribute('href', `./form.html#${myId}`);
            myLinkUpdate.innerText = 'Modifier';

            //Création d'un "lien" pour supprimer. Au clic, le fetch envoi vers index.js sur la route /delete 
            //avec la methode delete et l'id pour permettre la suppression de l'object correspondant.
            myLinkDelete.innerText = 'Supprimer';


            myLinkDelete.addEventListener("click", (e) => {

                let obj = { myId };
                let myHeaders = new Headers();
                let url = `/delete/${myId}`;
                let options = {
                    method: 'DELETE',
                    headers: myHeaders,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    cache: 'default',
                    body: JSON.stringify(obj)
                };

                fetch(url, options)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                        return Promise.reject(res);
                    })
                    .then((response) => {
                        // console.log(response);
                    })
                    .catch((err) => {
                        console.log(`Error fetch /delete/${myId}`, err);
                    })

                window.location = "/pages/liste.html";
            });


            containerList.appendChild(myDivCardArtiste);
            myDivCardArtiste.appendChild(myDivVideo);
            myDivCardArtiste.appendChild(myH2Title);
            myDivCardArtiste.appendChild(myDivA);
            myDivA.appendChild(myLinkDetail);
            myDivA.appendChild(myLinkUpdate);
            myDivA.appendChild(myLinkDelete);
        });
    })
    .catch((err) => {
        console.log('Error fetch /liste', err);
    });