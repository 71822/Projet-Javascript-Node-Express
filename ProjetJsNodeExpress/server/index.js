//RECUPERATION D'EXPRESS ET DE PATH POUR LE TRAITEMENT DES TOUTES
const express = require('express');
const path = require('path');
//RECUPERATION DU FICHIER liste.js
const Liste = require('./data/liste');

let app = express();
const port = 3000;
//ON ECOUTE SUR LE PORT 3000
app.listen(port, () => { console.log(`Server Launch on Port : ${port}`); });


// CONFIGURATION D'EXPRESS
const distDir = '../src/';
app.use('/pages', express.static(path.join(__dirname, distDir, '/pages')));
app.use('/assets', express.static(path.join(__dirname, distDir, '/assets')));
app.use(express.json());


// ROUTES :

//SUR LA ROUTE / SERA ENVOYE LA PAGE index.html
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, distDir, 'index.html')); });

//ENVOI LE JSON DU FICHIER LISTE.JS SUR /LISTE
app.get('/liste', (req, res) => { res.send(Liste); });

//RECUPERE LES DONNEES DU FICHIER LISTE.JS DANS DOSSIER DATA ET ENVOIE AU FETCH DE LISTE.JS DANS SRC
app.get('/liste', (req, res) => { Liste.forEach((elt) => { res.send(elt); }); });


//RECUPERE LES DONNEES DU BODY DU FORM ENVOYEES EN POST ET LES INSERE DANS LE TABLEAU D'OBJET de liste.js
app.post('/liste', (req, res) => {
  Liste.push(req.body);
});

//RECUPERE ET ENVOI LES DONNEES DE liste.js, QUI CORRESPONDENT A L'ID RECUPERE POUR L'AFFICHAGE DE LA PAGE INDIVIDUELLE
app.get('/videoIndividuelle/:id', (req, res) => {
  let myId = req.params.id;
  Liste.forEach((elt) => {
    if (elt._id == myId) { res.send(elt); }
  });
});


//RECUPERE ET ENVOI LES DONNEES DE liste.js, QUI CORRESPONDENT A L'ID RECUPERE POUR LA MODIFICATION DU FORMULAIRE
app.get('/formUpdate/:id', (req, res) => {
  let myId = req.params.id;

  Liste.forEach((elt) => {
    if (elt._id == myId) {
      res.send(elt);
    }
  });
});


//RECUPERE LES DONNEES MODIFIEES 
app.put('/formUpdate/:id', (req, res) => {
  let myId = req.params.id;

  Liste.forEach((elt) => {
    if (elt._id == myId) {
      //Si les données n'ont pas étés modifiées ont garde les données existantes ou on insère les nouvelles.
      elt._id = myId;
      req.body.inputTitle.length > 0 ? elt._title = req.body.inputTitle : elt._title = elt._title;
      req.body.inputDescription.length > 0 ? elt._description = req.body.inputDescription : elt._description = elt._description;
      req.body.inputGenre.length > 0 ? elt._genre = req.body.inputGenre : elt._genre = elt._genre;
      req.body.inputLien.length > 0 ? elt._video = req.body.inputLien : elt._video = elt._video;
    }
  });

});


//RECUPERE L'ID DE L'OBJET A SUPPRIMER ET LE SUPPRIME AVEC SPLICE S'IL CORRESPOND 
app.delete('/delete/:id', (req, res) => {
  let myId = req.params.id;

  Liste.forEach((elt) => {
    let id = elt._id;
    parseInt(id);
    parseInt(myId);
    if (id == myId) {
      Liste.splice(id, 1);
    }
  });
});



