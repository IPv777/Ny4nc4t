// ==UserScript==
// @name         Nyan
// @namespace    https://raw.githack.com/IPv777/Ny4nc4t/master/nyan.user.js
// @version      1.1
// @description  Affiche un nyancat
// @author       IPv7
// @match        https://astektv.groupeastek.com/*
// @grant        none
// ==/UserScript==


nyan = (function() {
	var IMG_SRC = "https://rawcdn.githack.com/IPv777/Ny4nc4t/0356f377f343621289bd76eb50622768f18f2ade/nyancat.gif";
	var STEP_SIZE = 150;
	var body, img, targetX, targetY, mouseX = 0, mouseY = 0;

	function createImgElement() {
		img = document.createElement('img');
		img.id = 'nyanimg';
		img.src = IMG_SRC;
		img.style['width'] = '500px';
		img.style['z-index'] = '100';
		img.style['position'] = 'fixed';
		img.style['left'] = 0;
		img.style['top'] = 0;
		img.style['display'] = 'none';
	}

	function randomWalk() {
		setRandomTarget();
		img = document.getElementById("nyanimg");
		setInterval(function() {
			if ((atTarget()) && (img.style['display'] == '')) {
				setRandomTarget()
			}
			stepTowardsTarget();
		}, 20);
	}

	function speed() {
		var bonus = 0;
		var dx = mouseX - posX();
		var dy = mouseY - posY();
		var dist = Math.sqrt(dx * dx + dy * dy);
		if (dist < 500) {
			bonus = (500 - dist) / 10;
		}
		return STEP_SIZE + bonus;
	}

	function atTarget() {
		return posX() == targetX && posY() == targetY;
	}

	function setRandomTarget() {
		targetX = Math.floor(Math.random() * window.innerWidth);
		targetY = Math.floor(Math.random() * window.innerHeight);
	}

	function posX() {
		return parseFloat(img.style['left']);
	}

	function posY() {
		return parseFloat(img.style['top']);
	}

	function stepTowardsTarget() {
		var dx = targetX - posX();
		var dy = targetY - posY();
		var d = Math.sqrt(dx * dx + dy * dy);
		var step = speed();
		if (d <= step) {
			img.style['left'] = targetX + 'px';
			img.style['top'] = targetY + 'px';
		}
		else {
			img.style['left'] = posX() + dx * step / d + 'px';
			img.style['top'] = posY() + dy * step / d + 'px';
		}
	}

	function setMouseListener() {
		window.addEventListener('mousemove', function() {
			mouseX = window.event.clientX;
			mouseY = window.event.clientY;
		});
	}
	return function() {
		createImgElement()
		body = document.getElementsByTagName('body')[0];
		body.appendChild(img);
		setMouseListener();
		randomWalk();
	};
})();

function setCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
	document.cookie = c_name + "=" + c_value;
}

function getCookie(c_name) {
	var i, x, y, ARRcookies = document.cookie.split(";");
	for (i = 0; i < ARRcookies.length; i++) {
		x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g, "");
		if (x == c_name) {
			return unescape(y);
		}
	}
}
window.addEventListener('load', function() {
	if (!getCookie("nyan")) {
		nyan();
		setCookie("nyan", "true");
	}
});
nyan();

function attendreShow() {
	setTimeout(hideNyan, 1000); //On attend 1 seconde avant d'exécuter la fonction hideNyan
}

function attendreHide() {
	var min = 30; // minutes
	var max = 45; // minutes
	var secondesAttente = Math.floor(Math.random() * (max - min + 1) + min) * 60; // On attend entre 1H et 1H30 avant d'exécuter la fonction showNyan
	//var secondesAttente = 2; // test de 2 secondes
	console.log("Attente de " + (secondesAttente / 60) + " minutes...")
	setTimeout(showNyan, secondesAttente * 1000); // On attend secondesAttente avant d'exécuter la fonction showNyan
}

function showNyan() {
	img = document.getElementById("nyanimg");
	img.style['display'] = '';
	attendreShow();
}

function hideNyan() {
	img = document.getElementById("nyanimg");
	img.style['display'] = 'none';
	attendreHide();
}
hideNyan();
