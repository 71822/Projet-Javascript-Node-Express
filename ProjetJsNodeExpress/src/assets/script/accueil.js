//IMPORT DE LA FUNCTION navigation() DU FICHIER function.js
import { navigation } from "./function.js";
navigation();


let pictureBackground = document.querySelector('.pictureBackground');

//FETCH POUR INTEGRER LES IMAGE D'UNE API POUR AVOIR UNE IMAGE DE FOND SUR LA PAGE D'ACCUEIL
let getQuote = () => {
    fetch('https://picsum.photos/1000/510')
        .then((res) => {
            pictureBackground.innerHTML = `<img src=${res.url} />`;
        });
};

//AU CLIC SUR L'IMAGE IL Y A RAPPEL DE LA FONCTION ET DONC CHANGEMENT D'IMAGE
pictureBackground.addEventListener('click', () =>
    getQuote()
);

//APPEL DE LA FONCTION
getQuote();