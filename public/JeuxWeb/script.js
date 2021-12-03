//width="800" height="450"
document.addEventListener("keydown", keySpace, false);
var scoreTxt=document.getElementById("score");
var c=document.getElementById("monCanvas");
c.width  = c.offsetWidth;
c.height = c.offsetHeight;
var ctx=c.getContext("2d");
//ctx.fillStyle="#FF0000";
//ctx.fillRect(0,0,800,950);
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
var couldownALaMer=1;
var imgCaillou = new Image;
imgCaillou.src = "KAYOU1.png";
var imgBato = new Image;
imgBato.src = "bato.png";

var run=setInterval(main, 1);

function drawBateau() {
	ctx.drawImage(imgBato,0,410-position);
}

function drawBouer() {
	ctx.fillStyle="#582900";
	ctx.fillRect(10,450-position,20,-20);
	//ctx.drawImage(img,0,0);
}

function drawALaMer() {
	for(let i=0;i<aLaMer.length;i++){
		ctx.fillStyle="#FFFF00";
		ctx.fillRect(aLaMer[i],450,20,-20);
		//ctx.drawImage(img,0,0);
	}
}

function drawObstacleSol() {
	for(let i=0;i<obstacleSol.length;i++){
		ctx.drawImage(imgCaillou,obstacleSol[i],430);
	}
}

function drawObstacleAir() {
	for(let i=0;i<obstacleAir.length;i++){
		ctx.fillStyle="#00FF00";
		ctx.fillRect(obstacleAir[i],400,20,-20);
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
	if(obstacleSol.length!=0)
		if((obstacleSol[0]<=0 && obstacleSol[0]+20>=0) || (obstacleSol[0]<=40 && obstacleSol[0]+20>=40)){
	    	if(position<21)clearInterval(run);
		}

	if(obstacleAir.length!=0)
		if((obstacleAir[0]<=0 && obstacleAir[0]+20>=0) || (obstacleAir[0]<=40 && obstacleAir[0]+20>=40)){
	    	if(position>39)clearInterval(run);
		}

	if(aLaMer.length!=0)
		if((aLaMer[0]<=0 && aLaMer[0]+20>=0) || (aLaMer[0]<=40 && aLaMer[0]+20>=40)){
			if(position<21){
				if(bouer!=0)score+=100;
    			else score-=100;
    			aLaMer.shift();
    			//console.log(aLaMer);
			}
		}
}

function main() {
	time++;
	score++;
	random--;
	if (random==0) {
		if (Math.random()<0.5) {
			obstacleSol.push(850);
			random=parseInt(Math.random()*100+500);
		}else{
			obstacleAir.push(850);
			random=parseInt(Math.random()*100+500);
		}
	}
	couldownALaMer--;
	if (couldownALaMer==0) {
		aLaMer.push(850);
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
			//console.log(obstacleSol.length);
			obstacleSol.slice(i,1);
			//console.log("ohe");
			//console.log(obstacleSol.length);
		}else{
			obstacleSol[i]--;
		}
	}
	for(let i=0;i<obstacleAir.length;i++){
		if (obstacleAir[i]<-49) {
			//console.log(obstacleSAir.length);
			obstacleAir.slice(i,1);
			//console.log("ohe");
			//console.log(obstacleSAir.length);
		}else{
			obstacleAir[i]--;
		}
	}
	for(let i=0;i<aLaMer.length;i++){
		if (aLaMer[i]<-49) {
			//console.log(obstacleSAir.length);
			aLaMer.slice(i,1);
			//console.log("ohe");
			//console.log(obstacleSAir.length);
		}else{
			aLaMer[i]--;
		}
	}
	physique();
	//console.log(obstacleSol);
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,800,450);
	drawBateau();
	drawALaMer();
	drawObstacleSol();
	drawObstacleAir();
	if (bouer!=0) {drawBouer()}
	scoreTxt.innerText=score;
}