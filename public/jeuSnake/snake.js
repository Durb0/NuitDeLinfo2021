/*Le programme débute par la définition de constantes et de variables globales :
* {{{COTE}}} : dimensions en pixels des carrés qui servent de trame pour le jeu,
* {{{NB_COLONNES}}} et {{{NB_LIGNES}}} : dimensions de la zone de jeu en nombres de carrés.*/
var NB_COLONNES=15;
var NB_LIGNES=15;
var COTE=32;
/*Définitions des variables qui réprésentent les éléments de l'interface utilisateur.

Pour dessiner sur le {{{canvas}}} on doit obligatoirement passer par un contexte (ici {{{2d}}}).*/
var score=document.getElementById("score");
var dessin=document.getElementById("dessin");
var ctx=dessin.getContext("2d");
/*Dimensionnement du {{{canvas}}} (en pixels).*/
dessin.width=NB_COLONNES*COTE;
dessin.height=NB_LIGNES*COTE;
/*La couleur de remplissage utilisée pour dessiner sur le {{{canvas}}} est le bleu.*/
ctx.fillStyle="#0000FF";
/*Les positions des différents carrés du serpent (en unités de carrés) sont rangées dans le tableau {{{snake}}} :

Au départ le snake est constitué de 5 carrés, le carré de tête est en début de tableau.

Chaque position est elle-même un tableau contenant l'abscisse et l'ordonnée.*/
var snake=[[4,0]];
/*Position du bonbon.*/
var bonbon;
/*Valeurs à ajouter à l'abscisse et à l'ordonnée du carré de tête pour réaliser le déplacement du serpent.

Au départ le serpent se déplace vers la droite.*/
var snakeIncX=1;
var snakeIncY=0;
/***Fonction de mise à jour du dessin**

Cette fonction s'occupe de dessiner sur le {{{canvas}}} le dessin correspondant à l'état actuel du jeu :

* L'ensemble du {{{canvas}}} est effacé,
* une boucle permet de parcourir les éléments du tableau {{{snake}}} pour afficher les différents carrés constituant le corps du serpent,
* le bonbon est dessiné (également sous forme de carré).*/
let imgNoyeList = [["images/black_gregory.png", "images/black_migran.png"],["images/white_gregory.png", "images/white_migran.png"]]
let headImage = new Image()
let tailImage = new Image()
let noyeImage = new Image()
headImage.src = "images/bato.png"
tailImage.src = "images/mig_save.png"
noyeImage.src = "images/migNoy.png"
let indexMig = 0
let colorMig = 0
function majDessin(){
	ctx.clearRect(0,0,dessin.width,dessin.height);
	ctx.drawImage(headImage, snake[0][0]*COTE,snake[0][1]*COTE,COTE,COTE);
	for(var i=1,l=snake.length;i<l;i++){
        ctx.drawImage(tailImage, snake[i][0]*COTE,snake[i][1]*COTE,COTE,COTE);
	}
	noyeImage.src = imgNoyeList[colorMig][indexMig]
	indexMig = indexMig ==0 ? 1: 0
	ctx.drawImage(noyeImage,bonbon[0]*COTE,bonbon[1]*COTE,COTE,COTE);	
}
/***Fonction de mise à jour du score***/
// function majScore(s){
// 	score.innerHTML=s;
// }
/***Fonction de gestion de fin de partie**

Lorsque la partie se termine : 

* le {{{timer}}} chargé d'appeler la fonction toutes les 100 millisecondes est arrêté,
* on affiche un message pour indiquer au joueur qu'il a perdu,
* on relance le jeu en rechargeant la page web.*/
function finPartie(){
	clearInterval(timerJeu);
	//alert("Perdu !");
	setTimeout(()=>{

		location.reload();
	},400)
}
/***Fonction de la boucle du jeu**

Cette fonction est appelée toutes les 100 millisecondes, à chaque fois la nouvelle position du serpent est calculée en appelant 
{{{bougeSnake}}} qui retourne {{{true}}} ou {{{false}}} selon que la partie doit continuer ou non.*/
function boucleJeu(){
	if(bougeSnake()){
		majDessin();
	}else{
		finPartie();
	}
}
/***Fonction de gestion des événements du clavier**

Lorsque une touche fléchée du clavier est appuyée les variables {{{snakeIncX}}} et {{{snakeIncY}}} qui déterminent la façon de déplacer
le serpent sont modifiées. Les tests servent à empêcher le snake de revenir sur ses pas.*/
document.addEventListener("keydown", function(e){
    if(e.code == "ArrowDown") {
        if(snakeIncY==0){
            snakeIncX=0;
            snakeIncY=1;
        }
    }
    else if(e.code == "ArrowUp") {
        if(snakeIncY==0){
            snakeIncX=0;
            snakeIncY=-1
        }
    } else if(e.code == "ArrowRight") {
        if(snakeIncX==0){
            snakeIncX=1;
            snakeIncY=0
        }
    } else if(e.code == "ArrowLeft") {
       
        if(snakeIncX==0){
            snakeIncX=-1;
            snakeIncY=0
        }
    }
})
/***Fonction qui place au hasard le bonbon***/
function placeBonbon(){
	bonbon=[1+Math.floor((NB_COLONNES-2)*Math.random()),1+Math.floor((NB_LIGNES-2)*Math.random())];
}
/***Fonction qui gère le calcul de la position du serpent**

On commence par calculer la nouvelle position du carré de tête en ajoutant à l'abscisse et à l'ordonnée de la tête actuelle
le contenu des variables {{{snakeIncX}}} et {{{snakeIncY}}}.

Si la tête sort du cadre du jeu ou si la tête touche le corps du serpent la partie est terminée (la fonction retourne {{{false}}}).

Si la tête touche le bonbon, le serpent s'allonge.*/
function bougeSnake(){
	var tete=[snake[0][0]+snakeIncX,snake[0][1]+snakeIncY];
/*Test pour savoir si le snake sort du cadre*/
	if(tete[0]==-1||tete[0]==NB_COLONNES||tete[1]==-1||tete[1]==NB_LIGNES) {
		console.log("mur");
		let audio = new Audio('son/mur.mp3');
		audio.play();
		return false;
	} 

/*Test pour savoir si le snake se mord :
La boucle sert à parcourir le tableau des positions des éléments du serpent pour les comparer à la nouvelle position de la tête, en cas de coïncidence la fonction se termine immédiatement en retournant {{{false}}}.*/
	for(var i=0,l=snake.length-1;i<l;i++){
		if((tete[0]==snake[i][0])&&(tete[1]==snake[i][1])) {
			console.log("ah");
			let audio = new Audio('son/ah.mp3');
			audio.play();
			return false;
		}
	}
/*Si la position de la tête coïncide avec la position du bonbon, on place un nouveau bonbon et on met à jour le nouveau score.

Dans le cas contraire le dernier élément du tableau {{{snake}}} est retiré (le serpent ne doit pas s'allonger).*/
	if((tete[0]==bonbon[0])&&(tete[1]==bonbon[1])){
		let audio = new Audio('son/waou.mp3');
		audio.play();
		placeBonbon();
		colorMig = colorMig==0 ? 1 : 0
		// majScore(snake.length-4);
	}else{
		snake.pop();
	}
/*La nouvelle position de tête est ajoutée au début du tableau {{{snake}}}.*/
	snake.unshift(tete);
	return true;
}
/***Initialisation du jeu**

Un premier bonbon est placé au hasard et un {{{timer}}} est utilisé pour appeler la fonction {{{boucleJeu}}} toutes les 100 millisecondes.*/

placeBonbon();
var timerJeu=setInterval(boucleJeu,100);