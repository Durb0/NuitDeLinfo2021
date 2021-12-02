//width="800" height="450"
document.addEventListener("keydown", keySpace, false);
var c=document.getElementById("monCanvas");
var ctx=c.getContext("2d");
//ctx.fillStyle="#FF0000";
//ctx.fillRect(0,0,800,950);
var etat=0;
var position=0;
var obstacleSol=[];
var time=0;
var random=100;
//var img = new Image;
//img.src = "test.png";

var run=setInterval(main, 0.1);

function drawBateau() {
	ctx.fillStyle="#0000FF";
	ctx.fillRect(0,450-position,40,-40);
	//ctx.drawImage(img,0,0);
}

function drawObstacle() {
	for(let i=0;i<obstacleSol.length;i++){
		ctx.fillStyle="#000000";
		ctx.fillRect(obstacleSol[i],450,20,-20);
	}
}

function keySpace(e) {
    if(e.key == " " && etat==0) {
        etat=1;
    }else if(e.key=="Escape"){
    	clearInterval(run);
    }
}

function physique(){
	if((obstacleSol[0]<0 && obstacleSol[0]+20>0) || (obstacleSol[0]<40 && obstacleSol[0]+20>40)){
    	if(position<21)clearInterval(run);
	}
}

function main() {
	time++;
	random--;
	if (random==0) {
		obstacleSol.push(850);
		random=parseInt(Math.random()*100+500);
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
	for(let i=0;i<obstacleSol.length;i++){
		if (obstacleSol[i]<-49) {
			//console.log(obstacleSol.length);
			obstacleSol.shift();
			//console.log("ohe");
			//console.log(obstacleSol.length);
		}else{
			obstacleSol[i]--;
		}
	}
	physique();
	//console.log(obstacleSol);
	ctx.fillStyle="#FFFFFF";
	ctx.fillRect(0,0,800,450);
	drawBateau();
	drawObstacle();
}