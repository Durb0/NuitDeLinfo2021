//width="800" height="450"
document.addEventListener("keydown", keySpace, false);
var scoreTxt=document.getElementById("score");
var c=document.getElementById("monCanvas");
c.width  = c.offsetWidth;
c.height = c.offsetHeight;
var ctx=c.getContext("2d");
var etat=0;
var position=0;
var obstacleSol=[];
var obstacleAir=[];
var aLaMer=[];
var time=0;
var score=0;
var random=1;
var bouer=0;
var couldownBouer=0;
var couldownALaMer=100;
var imgCaillou = new Image;
imgCaillou.src = "KAYOU1.png";
var imgBato = new Image;
imgBato.src = "bato.png";
var imgBouer = new Image;
imgBouer.src = "bou-er.png";
var imgMouette = new Image;
imgMouette.src = "pi-jon.png";
var imgALaMer = new Image;
imgALaMer.src = "white_migran.png";

var run=setInterval(main, 1);

function drawBateau() {
	ctx.drawImage(imgBato,0,310-position);
}

function drawBouer() {
	ctx.drawImage(imgBouer,10,330-position);
}

function drawALaMer() {
	for(let i=0;i<aLaMer.length;i++){
		ctx.drawImage(imgALaMer,aLaMer[i],330);
	}
}

function drawObstacleSol() {
	for(let i=0;i<obstacleSol.length;i++){
		ctx.drawImage(imgCaillou,obstacleSol[i],330);
	}
}

function drawObstacleAir() {
	for(let i=0;i<obstacleAir.length;i++){
		ctx.drawImage(imgMouette,obstacleAir[i],280);
	}
}

function keySpace(e) {
    if(e.key == " " && etat==0) {
        etat=1;
    }else if(e.key=="ArrowDown" && bouer==0 && couldownBouer==0){
    	bouer=1;
    }else if(e.key=="Escape"){
    	clearInterval(run);
    }
}

function physique(){

	for(let i=0;i<obstacleSol.length;i++){
		if((obstacleSol[i]<=0 && obstacleSol[i]+20>=0) || (obstacleSol[i]<=40 && obstacleSol[i]+20>=40)){
	    	if(position<21)clearInterval(run);
		}
	}

	for(let i=0;i<obstacleAir.length;i++){
		if((obstacleAir[i]<=0 && obstacleAir[i]+20>=0) || (obstacleAir[i]<=40 && obstacleAir[i]+20>=40)){
	    	if(position>19)clearInterval(run);
		}
	}		

	for(let i=0;i<aLaMer.length;i++){
		if((aLaMer[i]<=0 && aLaMer[i]+20>=0) || (aLaMer[i]<=40 && aLaMer[i]+20>=40)){
			if(position<21){
				if(bouer!=0)score+=100;
    			else score-=100;
    			aLaMer.shift();
			}
		}
	}		
}

function main() {
	time++;
	score++;
	random--;
	if (random==0) {
		if (Math.random()<0.5) {
			if(aLaMer.length!=0 && aLaMer[aLaMer.length-1]<750)obstacleSol.push(950);
			else obstacleSol.push(850);
			random=parseInt(Math.random()*100+500);
		}else{
			obstacleAir.push(850);
			random=parseInt(Math.random()*100+500);
		}
	}
	couldownALaMer--;
	if (couldownALaMer==0) {
		if(obstacleSol.length!=0 && obstacleSol[obstacleSol.length-1]<750)aLaMer.push(950);
		else aLaMer.push(850);
		couldownALaMer=parseInt(Math.random()*100+500);
	}
	if (etat==1 && position<50) {
		position+=0.5;
	}else if(etat==1){
		etat=2;
	}
	if (etat==2 && position>0) {
		position-=0.5;
	}else if(etat==2){
		etat=0;
	}
	if (couldownBouer>0) {
		couldownBouer--;
	}else if (bouer!=0 && bouer<100) {
		bouer++;
	}else if (bouer !=0) {
		bouer=0;
		couldownBouer=200;
	}
	for(let i=0;i<obstacleSol.length;i++){
		if (obstacleSol[i]<-49) {
			obstacleSol.slice(i,1);
		}else{
			obstacleSol[i]--;
		}
	}
	for(let i=0;i<obstacleAir.length;i++){
		if (obstacleAir[i]<-49) {
			obstacleAir.slice(i,1);
		}else{
			obstacleAir[i]--;
		}
	}
	for(let i=0;i<aLaMer.length;i++){
		if (aLaMer[i]<-49) {
		}else{
			aLaMer[i]--;
		}
	}
	physique();
	ctx.clearRect(0, 0, 800, 450);
	//ctx.drawImage(imgBackground.image,0,0);
	drawBateau();
	drawALaMer();
	drawObstacleSol();
	drawObstacleAir();
	if (bouer!=0) {drawBouer()}
	scoreTxt.innerText=score;
}