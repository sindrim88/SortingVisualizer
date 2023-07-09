
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var slider_num = document.getElementById("myRange");
var output_num = document.getElementById("demo");

var slider_speed = document.getElementById("speed");
var output_speed = document.getElementById("out_speed");

output_speed.innerHTML = slider_speed.value;
output_num.innerHTML = slider_num.value;

var elements_to_sort = 400;
var  ANIMATION_SPEED_MS = 10;

slider_speed.oninput = function() {
	if(counter == timeout_array[timeout_array.length-1]  || counter == 0){
		
     	ANIMATION_SPEED_MS = this.value;
	}
	output_speed.innerHTML = this.value;
}

slider_num.oninput = function() {
  output_num.innerHTML = this.value;
  elements_to_sort = this.value;

}

var rand = Math.floor((Math.random() * 590) + 1); 
var Arr = []; // This array will contain coordinates 
var arr_Numbers = []; // This array will contain only the y coord needed to sort.

 // How fast the animation is
//const width = 4 // bar width
var counter = 0;

var is_finished = true;
//rect objects that store the coordinates
var square = {
    cx : 0,
    cxx: 0,
    cy : 0
};


var gap = 1
function create_random_array(){

	var width =  2;
	//console.log(width);

	//fill the array with random numbers 
	for (var i = 0; i < elements_to_sort; i++) {
		
		rand = 600 - Math.floor((Math.random() * 590) + 1); 
		arr_Numbers.push(rand);
		if(i == 0){
			var square = {
			    cx : 1,
			    cxx: width + 1,
			    cy : rand
			};
		}
		else{
			var square = {
			    cx : Arr[i-1].cxx +gap,
			    cxx: Arr[i-1].cxx +gap+width,
			    cy : rand
			};
		}
		Arr.push(square);
	}
	return width;
}

//Draw unsorted colums
function draw_beginning(width){
	for (var i = 0; i < Arr.length; i++) {
		
		g_ctx.beginPath();
	    g_ctx.lineWidth = "1";
	    //g_ctx.strokeStyle = "#0000FF";
	    g_ctx.fillStyle = "#1500ff";
	    g_ctx.rect(Arr[i].cx, Arr[i].cy, width,  600);
	    //g_ctx.stroke();
	    g_ctx.fill();
	}
}

function QuickSort(arr, start, end, width){

	if(start < end ){
		var partitionIndex = partition(arr, start, end, width);
		QuickSort(arr, start, partitionIndex-1, width);
		QuickSort(arr, partitionIndex+1, end, width);
	}

}

function partition(arr, start, end, width){
	var pivot = arr[end];
	var i = start;

	for (var j = start; j <= end; j++){
		//console.log(Arr[i].cxx - Arr[i].cx);
		if (arr[j] > pivot){
			
			var tempSwap = arr[i]
            arr[i] = arr[j]
            arr[j] = tempSwap
            counter++;
            re_draw(i, j,counter, width);
            i = i+1;
		}
	}

	var tempSwap2 = arr[i]
    arr[i] = arr[end]
    arr[end] = tempSwap2
    
    counter++;

    re_draw(i, end,counter, width);
    return i;
}



function merge_sort(arr, start, end, width){
	if (start < end) {
		var m = (start + end) / 2;
		var mid = Math.floor(m);
        
		merge_sort(arr, start, mid, width);
		merge_sort(arr, mid + 1, end, width);
		merge(arr, start, mid, end, width);
	}
}

/// mergesort is mostly taken from GeeksforGeeks java code.
///
function merge(arr, start, mid, end, width){

	var int1 = mid - start + 1;
	var int2 = end - mid ;

	var L = new Array(int1);
	var R = new Array(int2);

	
	for(var i=0; i< int1; ++i){
		L[i] = arr[start + i];
		//L.splice(i, 0, arr[start + i]);
	}
	for(var j=0; j< int2; ++j){
		R[j] = arr[mid + 1 + j];
		//R.splice(j, 0, arr[mid + 1 + j]);
	}

	var i = 0;
	var j = 0;
	var k = start;

	while(i < int1 && j < int2){
		counter++;
		if(L[i] >= R[j]){
			arr[k] = L[i];
			re_draw_merge(k,i, counter, L[i], width);
			i++;
		}
		else {
			arr[k] = R[j];
			re_draw_merge(k,j, counter, R[j], width);
			j++;
		}
		k++;
	}

	while(i < int1){
		arr[k] = L[i];
		re_draw_merge(k, i , counter, L[i], width);
		i++;
		k++;
	}

	while(j < int2){
		arr[k] = R[j];
		re_draw_merge(k,j, counter, R[j], width);
		j++;
		k++;
	}
}

function re_draw_merge(i, j, counter, temp, width){
		
		set_Timeout = setTimeout(() => {
		g_ctx.clearRect(Arr[i].cx -0.5, Arr[i].cy-0.1, width +1, 600);
		//g_ctx.clearRect(Arr[j].cx -0.5, Arr[j].cy-0.1, width +1, 600);
		
		var temp1 = Arr[i].cy;
		Arr[i].cy = temp;

	    //Arr[j].cy = temp2;
		
		//redraw the two colums in correct place
	    g_ctx.beginPath();
	    g_ctx.lineWidth = "1";
	    //g_ctx.strokeStyle = "#00ff37";
	    g_ctx.fillStyle = "#ff0000";
	    g_ctx.rect(Arr[i].cx, Arr[i].cy, width,  600);
	    //g_ctx.stroke();
	    g_ctx.fill();

	    g_ctx.beginPath();
	    g_ctx.lineWidth = "1";
	    //g_ctx.strokeStyle = "#00ff37";
	    g_ctx.fillStyle = "#ff0000";
	    //g_ctx.rect(Arr[j].cx , Arr[j].cy, width,  600);
	    //g_ctx.stroke();
	    g_ctx.fill();
	    timeout_array.push(counter);
	    //console.log(timeout_array[timeout_array.length-1]); 
	    set_Timeout2 = setTimeout(() => {
	    	
		    g_ctx.beginPath();
		    g_ctx.lineWidth = "1";
		    //g_ctx.strokeStyle = "#0000FF";
		    g_ctx.fillStyle = "#1500ff";
		    g_ctx.rect(Arr[i].cx , Arr[i].cy, width,  600);
		    //g_ctx.stroke();
		    g_ctx.fill();

		    g_ctx.beginPath();
		    g_ctx.lineWidth = "1";
		    //g_ctx.strokeStyle = "#0000FF";
		    g_ctx.fillStyle = "#1500ff";
		    //g_ctx.rect(Arr[j].cx , Arr[j].cy, width,  600);
		    //g_ctx.stroke();
		    g_ctx.fill();
		}, (ANIMATION_SPEED_MS));
	    }, counter * ANIMATION_SPEED_MS);
}



function bubbleSort(arr, start, end, width){
	for (var i = 0; i < arr.length; i++) {
		for (var j = 1; j < arr.length; j++) {
			if(arr[j-1] < arr[j]){

				var temp = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = temp;
				counter++;
				re_draw(j-1, j, counter, width);
			}
		}	
	}
}




var timeout_array = [];
var set_Timeout;
var set_Timeout2;

function re_draw(i, j, counter, width){
		
		set_Timeout = setTimeout(() => {
		g_ctx.clearRect(Arr[i].cx -0.5, Arr[i].cy-0.1, width +1, 600);
		g_ctx.clearRect(Arr[j].cx -0.5, Arr[j].cy-0.1, width +1, 600);
		
		var temp = Arr[i].cy;
		Arr[i].cy = Arr[j].cy;
	    Arr[j].cy = temp
		
		//redraw the two colums in correct place
	    g_ctx.beginPath();
	    g_ctx.lineWidth = "1";
	    //g_ctx.strokeStyle = "#00ff37";
	    g_ctx.fillStyle = "#ff0000";
	    g_ctx.rect(Arr[i].cx, Arr[i].cy, width,  600);
	    //g_ctx.stroke();
	    g_ctx.fill();

	    g_ctx.beginPath();
	    g_ctx.lineWidth = "1";
	    //g_ctx.strokeStyle = "#00ff37";
	    g_ctx.fillStyle = "#ff0000";
	    g_ctx.rect(Arr[j].cx , Arr[j].cy, width,  600);
	    //g_ctx.stroke();
	    g_ctx.fill();
	    timeout_array.push(counter);
	    //console.log(timeout_array[timeout_array.length-1]); 
	    set_Timeout2 = setTimeout(() => {
	    	
		    g_ctx.beginPath();
		    g_ctx.lineWidth = "1";
		    //g_ctx.strokeStyle = "#0000FF";
		    g_ctx.fillStyle = "#1500ff";
		    g_ctx.rect(Arr[i].cx , Arr[i].cy, width,  600);
		    //g_ctx.stroke();
		    g_ctx.fill();

		    g_ctx.beginPath();
		    g_ctx.lineWidth = "1";
		    //g_ctx.strokeStyle = "#0000FF";
		    g_ctx.fillStyle = "#1500ff";
		    g_ctx.rect(Arr[j].cx , Arr[j].cy, width,  600);
		    //g_ctx.stroke();
		    g_ctx.fill();
		}, (ANIMATION_SPEED_MS));
	    }, counter * ANIMATION_SPEED_MS);	   


}

function main(arr, width, id){
	draw_beginning(width);
	if(id == "bubble"){
		bubbleSort(arr, 0, arr.length-1, width);
	}
	else if(id == "quick"){
		QuickSort(arr, 0, arr.length-1, width);
	}
	else if(id == "merge"){
		merge_sort(arr, 0, arr.length, width);
		console.log(arr);
	}
}

// draw canvas white and reset initial values
function clear_Reset(){

	Arr = [];
	arr_Numbers = [];
	counter = 0;

	g_ctx.beginPath();
    g_ctx.lineWidth = "1";
    g_ctx.strokeStyle = "white";
    g_ctx.fillStyle = "white";
    g_ctx.rect(0, 0, 1200,  600);
    g_ctx.stroke();
    g_ctx.fill();
}



function check_Sorting_algo(id){
	if (id == "bubble") {
		console.log("Bubblesort selected");
	}

	else if (id == "quick") {
		console.log("Quicksort selected");
	}
	else if (id == "merge") {
		console.log("Mergesort selected");
	}

	if(counter == timeout_array[timeout_array.length-1]  || counter == 0){	
		clear_Reset();
		var wid = 2;
		create_random_array();
		main(arr_Numbers, wid, id);
	}
	else{
		console.log("Still sorting buddy");
	}
}
