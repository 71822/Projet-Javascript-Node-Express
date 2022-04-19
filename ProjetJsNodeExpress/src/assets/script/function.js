//FUNCTION POUR AFFICHER LA BARRE DE NAVIGATION
export function navigation() {

    let nav = document.querySelector('nav');
    nav.classList.add("nav");

    let accueil = document.querySelector('.navAccueil');
    accueil = document.createElement('a');
    accueil.setAttribute('href', `../`);
    accueil.classList.add("linkNav");
    accueil.innerHTML = `Accueil`;

    let liste = document.querySelector('.navListe');
    liste = document.createElement('a');
    liste.setAttribute('href', `/pages/liste.html`);
    liste.classList.add("linkNav");
    liste.innerHTML = `Liste`;

    let ajouter = document.querySelector('.navAjouter');
    ajouter = document.createElement('a');

    window.location.href === 'http://127.0.0.1:3000/' ? ajouter.setAttribute('href', './pages/form.html') : ajouter.setAttribute('href', './form.html');

    ajouter.classList.add("linkNav");
    ajouter.innerHTML = `Ajouter`;
    nav.appendChild(accueil);
    nav.appendChild(liste);
    nav.appendChild(ajouter);

}

export function video(linkToChange, width, height) {
    //Modification du lien envoyé par l'utilisateur afin qu'il puisse être intégré sur le site
    let myDivVideo = document.createElement('div');
    let replaceWatchByEmbed = linkToChange.replace('watch?v=', "embed/");
    let deleteTimeToLinkIfHaveTime = replaceWatchByEmbed.split('&')[0];
    let link = deleteTimeToLinkIfHaveTime;
    return myDivVideo = `<iframe width="${width}" height="${height}" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard - write; encrypted - media; gyroscope; picture -in -picture" allowfullscreen ></iframe>`;
}



