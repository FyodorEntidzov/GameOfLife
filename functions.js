var main = document.getElementById("mainView"),
buttonStart = document.getElementById("buttonStart"),
buttonStop = document.getElementById("buttonStop"),
buttonClear = document.getElementById("buttonClear");


main.className = "mainDiv";
var population = [],
determination = [],
twoStyles = ["dead", "alive"],
indexes = [-61, -60, -59, 1,61,60,59,-1],
k,
startSimulating;

function populating(){

	for(var i = 0;i<3600;i++){
		population[i] = document.createElement("div");
		population[i].className = "dead";
		population[i].style.left = (i*20)%1200 + "px";
		population[i].style.top = Math.floor(i/60)*20 + "px";
		population[i].addEventListener("click", function(e){
			
			e.target.className = twoStyles[(twoStyles.indexOf(e.target.className)+1)%2];
		
		});
		main.appendChild(population[i]);		
	}
}

function neighbors(indOfDiv){
	
	counter = 0;
	var indexOfCell;
	if(indOfDiv%60 == 0){
	
		for(j = 1;j<6;j++){
			indexOfCell = indOfDiv + indexes[j];		
			if(population[indexOfCell] == undefined){continue;}		
			else if(population[indexOfCell].className == "alive"){		
			counter++;
		}
		}
	
	}
	else if(indOfDiv%60==59){
		for(j = 1;j<6;j++){		
			indexOfCell = indOfDiv - indexes.reverse[j];		
			if(population[indexOfCell] == undefined){continue;}			
			else if(population[indexOfCell].className == "alive"){
			counter++;
		}	
	}
	}
	else{	
		for(j = 0;j<indexes.length;j++){		
			indexOfCell = indOfDiv + indexes[j];		
			if(population[indexOfCell] == undefined){continue;}		
			else if(population[indexOfCell].className == "alive"){		
			counter++;
		}	
	}
	}
	return counter;
}

function colorChange(neighbors, popIndex){

	var style = population[popIndex].className;
	
	if(style == "alive" & (neighbors < 2 || neighbors>3)){		
			style = "dead";	
	}
	else{
	
		if(neighbors == 3){		
			style = "alive";		
		}	
	}	
	return style;
}

function update(){
	
	for(k = 0;k<population.length;k++){
		
		determination[k] = colorChange(neighbors(k),k);
	
	}

	for(k=0;k<population.length;k++){
	
		population[k].className = determination[k];
	
	}
}

function start(){
	startSimulating = setInterval(update,100);
}

function stop(){
	clearInterval(startSimulating);
}