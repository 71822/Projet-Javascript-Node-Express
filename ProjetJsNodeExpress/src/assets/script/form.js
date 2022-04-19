//IMPORT DE LA CLASS ARTISTE  ---   IMPORT DE LA FUNCTION navigation() et fetch() DU FICHIER function.js
import Artiste from "./class.artiste.js";
import { navigation } from "./function.js";
navigation();

//RECUPERATION DE L'ID S'IL Y EN A UN ET SUPPRESSION DU DIESE AFIN QU'IL SOIT UTILISABLE PLUS BAS
let myId = window.location.hash.split('#')[1];

//TERNAIRE POUR FAIRE LA DISTINCTION ENTRE LE FORM POUR AJOUTER ET CELUI POUR SUPPRIMER
let ok = "";
myId ? ok = true : ok = false;


//RECUPERATION DES BALISES
let form1 = document.querySelector('.form1');
let titleForm = document.querySelector('.titleForm');
let inputTitle = document.querySelector('.inputTitle');
let inputDescription = document.querySelector('.inputDescription');
let inputGenre = document.querySelector('.inputGenre');
let inputLien = document.querySelector('.inputLien');

//ECOUTEUR D'EVENEMENT POUR ENREGISTRER LES DONNEES SAISIE
inputTitle.addEventListener('input', (e) => { inputTitle = e.target.value; });
inputDescription.addEventListener('input', (e) => { inputDescription = e.target.value; });
inputGenre.addEventListener('input', (e) => { inputGenre = e.target.value; });
inputLien.addEventListener('input', (e) => { inputLien = e.target.value; });



////////////////////////////////////////////////////////////
//MODIFIER 
////////////////////////////////////////////////////////////
if (ok) {

    //TITRE DU FICHIER FORM EN FONCTION DU TRAITEMENT 
    titleForm.innerHTML = `Modifier ma vidéo`;

    //FETCH EN GET POUR RECUPERER LES DONNEES A INSCRIRE DANS LE FORMULAIRE EN FONCTION DE L'ID
    let myHeaders = new Headers();
    let url = `/formUpdate/${myId}`;
    let options = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    }; fetch(url, options)

        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res);
        })
        .then((response) => {
            //INSCRIPTION DES DONNEES RECUPEREES DANS LES VALUES DES BALISES CORRESPONDANTES
            inputTitle.value = `${response._title}`;
            inputDescription.value = `${response._description}`;
            inputGenre.value = `${response._genre}`;
            inputLien.value = `${response._video}`;
        })
        .catch((err) => {
            console.log(`Error fetch /formAddUpdate.html/${myId}`, err);
        })


    //AU CLIC DE L'ENVOI DU FORMULAIRE, ENVOI DES DONNEES EN PUT AVEC FETCH
    form1.addEventListener("submit", (e) => {
        e.preventDefault();

        //CREATION D'OBJET AVEC LES DONNEES RECUPEREES QUI SERONT ENVOYEES AVEC JSON.stringify(object à envoyer) (convertit une valeur JavaScript en chaîne JSON)
        let obj = { inputTitle, inputDescription, inputGenre, inputLien }

        let myHeaders = new Headers();
        let url = `/formUpdate/${myId}`;
        let options = {
            method: 'PUT',
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
                console.log(`Error fetch /formUpdate/${myId}`, err);
            })

        //Redirection vers la page liste qui contient les vidéos
        window.location = "/pages/liste.html";

    });
}




/////////////////////////////////////////////////////////////////////
//AJOUTER 
/////////////////////////////////////////////////////////////////////

else if (!ok) {
    //TITRE DU FICHIER FORM EN FONCTION DU TRAITEMENT 
    titleForm.innerHTML = `Ajouter une vidéo`;

    //RECUPERATION DE L'ID AVEC FETCH EN GET POUR L'INCREMENTER 
    let nbInput = "";
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
            }
            return Promise.reject(res);
        })
        .then((response) => {
            //LE NOMBRE D'OBJET CORRESPOND A L'ID QU'IL FAUDRA ATTRIBUER
            nbInput = response.length;
        })
        .catch((err) => {
            console.log(`Error fetch /liste`, err);
        })


    //AU CLIC, ENVOI DES DONNEES EN POST SUR LA ROUTE /LISTE QUI ENVERRA LES DONNEES DANS LE FICHIER liste.js DANS LE DOSSIER DATA
    form1.addEventListener("submit", (e) => {
        //e.preventDefault() pour ne pas recharger la page
        e.preventDefault();

        //Création du nouvel objet avec les données récupérées dans le formulaire
        let obj = new Artiste(nbInput, inputTitle, inputDescription, inputGenre, inputLien);

        let myHeaders = new Headers();
        let url = '/liste';
        let options = {
            method: 'POST',
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
                console.log(`Error fetch /liste`, err);
            })

        //Redirection vers la page liste qui contient les vidéos
        window.location = "/pages/liste.html";
    });
}
