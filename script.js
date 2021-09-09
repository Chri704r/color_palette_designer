"use strict";

window.addEventListener("DOMContentLoaded", start);

function start() {
	//listen for color input
	const defaultColor = (document.querySelector("#color_input").value = "#946EE4");
	document.querySelector("#color_input").addEventListener("input", getColorInput);
	//listen for chosen harmony
	const defaultHarmony = (document.querySelector("#harmonies").value = "analogus");
	document.querySelector("#harmonies").addEventListener("input", getColorInput);
	//show all info from default colors
	userChoices(defaultColor, defaultHarmony);
}

function getColorInput() {
	const selectedColor = document.querySelector("#color_input").value;
	const selectedHarmony = document.querySelector("#harmonies").value;
	// getHarmony(selectedColor);
	userChoices(selectedColor, selectedHarmony);
}

function userChoices(color, harmony) {
	const selectedColor = color;
	//console.log(selectedColor);
	const selectedHarmony = harmony;
	//console.log(selectedHarmony);
	const rgbColor = hexToRgbBase(selectedColor);
	//console.log(rgbColor);
	const hslColor = rgbToHsl(rgbColor.R, rgbColor.G, rgbColor.B);
	//console.log(hslColor);

	//get other colors
	const hslColors = getColors(hslColor, selectedHarmony);
	console.log(hslColors);

	const rgbColors = [];

	hslColors.forEach((hslColor) => {
		const rgbColor = hslToRgb(hslColor.H, hslColor.S, hslColor.L);
		rgbColors.push(rgbColor);
	});
	console.log(rgbColors);

	const hexColors = [];

	rgbColors.forEach((rgbColor) => {
		const hexColor = rgbToHex(rgbColor.R, rgbColor.G, rgbColor.B);
		hexColors.push(hexColor);
	});

	console.log(hexColors);

	// call display functions
	displayColor(hexColors[0], hexColors[1], selectedColor, hexColors[2], hexColors[3]);
	displayHex(hexColors[0], hexColors[1], selectedColor, hexColors[2], hexColors[3]);
	displayRgb(rgbColors[0], rgbColors[1], rgbColor, rgbColors[2], rgbColors[3]);
	displayHsl(hslColors[0], hslColors[1], hslColor, hslColors[2], hslColors[3]);
}

function hexToRgbBase(color) {
	const R = parseInt(color.substring(1, 3), 16);
	const G = parseInt(color.substring(3, 5), 16);
	const B = parseInt(color.substring(5), 16);

	return { R, G, B };
}

function rgbToHsl(r, g, b) {
	r /= 255;
	g /= 255;
	b /= 255;

	let h, s, l;

	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);

	if (max === min) {
		h = 0;
	} else if (max === r) {
		h = 60 * (0 + (g - b) / (max - min));
	} else if (max === g) {
		h = 60 * (2 + (b - r) / (max - min));
	} else if (max === b) {
		h = 60 * (4 + (r - g) / (max - min));
	}

	if (h < 0) {
		h = h + 360;
	}

	l = (min + max) / 2;

	if (max === 0 || min === 1) {
		s = 0;
	} else {
		s = (max - l) / Math.min(l, 1 - l);
	}
	// multiply s and l by 100 to get the value in percent, rather than [0,1]
	s *= 100;
	l *= 100;

	return { H: Math.round(h), S: Math.round(s), L: Math.round(l) };
}

//---- GET COLORS---------

function getColors(hslColor, selectedHarmony) {
	if (selectedHarmony === "analogus") {
		const analogusColors = getAnalogusColor(hslColor);
		return analogusColors;
	} else if (selectedHarmony === "monochromatic") {
		const monochromaticColors = getMonochromaticColor(hslColor);
		return monochromaticColors;
	} else if (selectedHarmony === "triad") {
		const triadColors = getTriadColor(hslColor);
		return triadColors;
	} else if (selectedHarmony === "complementary") {
		const complementaryColors = getComplementaryColor(hslColor);
		return complementaryColors;
	} else if (selectedHarmony === "compund") {
		const compundColors = getCompoundColor(hslColor);
		return compundColors;
	} else if (selectedHarmony === "shades") {
		const shadeColors = getShadeColor(hslColor);
		return shadeColors;
	}
}

//calculate analogus colors
function getAnalogusColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}
	arrOfColors[0].H = (hslColor.H + -40) % 360;
	arrOfColors[1].H = (hslColor.H + -20) % 360;
	arrOfColors[2].H = (hslColor.H + 20) % 360;
	arrOfColors[3].H = (hslColor.H + 40) % 360;

	return arrOfColors;
}

//calculate monochromatic colors
function getMonochromaticColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}
	arrOfColors[0].L = (hslColor.S - 15) % 360;
	arrOfColors[1].S = (hslColor.S - 25) % 360;
	arrOfColors[2].S = (hslColor.S + 20) % 360;
	arrOfColors[3].L = (hslColor.L + 20) % 360;

	return arrOfColors;
}

//calculate triad colors
function getTriadColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}

	arrOfColors[0].H = (hslColor.H - 60) % 360;
	arrOfColors[0].L = (hslColor.L - 20) % 360;
	arrOfColors[1].H = (hslColor.H - 60) % 360;
	arrOfColors[2].H = (hslColor.H + 120) % 360;
	arrOfColors[2].L = (hslColor.H + 30) % 360;

	arrOfColors[3].H = (hslColor.H + 120) % 360;

	return arrOfColors;
}

//calculate complementary colors
function getComplementaryColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}

	arrOfColors[0].L = (hslColor.L + 15) % 360;
	arrOfColors[1].S = (hslColor.S + 25) % 360;
	arrOfColors[2].H = (hslColor.H + 180) % 360;
	arrOfColors[2].L = (hslColor.L + 10) % 360;
	arrOfColors[3].H = (hslColor.H + 180) % 360;

	return arrOfColors;
}

//calculate compund colors
function getCompoundColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}

	arrOfColors[0].L = (hslColor.L + 25) % 360;
	arrOfColors[1].S = (hslColor.S - 20) % 360;
	arrOfColors[2].H = (hslColor.H + 180) % 360;
	arrOfColors[2].L = (hslColor.L + 25) % 360;
	arrOfColors[3].H = (hslColor.H + 180) % 360;

	return arrOfColors;
}

//calculate shades
function getShadeColor(hslColor) {
	let hslObject = hslColor;
	const arrOfColors = [];
	for (let i = 0; i < 4; i++) {
		arrOfColors[i] = Object.assign({}, hslObject);
	}

	arrOfColors[0].L = (hslColor.L + 20) % 360;
	arrOfColors[1].L = (hslColor.L - 10) % 360;
	arrOfColors[2].L = (hslColor.L + 15) % 360;
	arrOfColors[3].L = (hslColor.L - 20) % 360;

	return arrOfColors;
}

//--turn hsl values to rgb
function hslToRgb(h, s, l) {
	h = h;
	s = s / 100;
	l = l / 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - c / 2,
		r = 0,
		g = 0,
		b = 0;
	if (0 <= h && h < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (60 <= h && h < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (120 <= h && h < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (180 <= h && h < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (240 <= h && h < 300) {
		r = x;
		g = 0;
		b = c;
	} else if (300 <= h && h < 360) {
		r = c;
		g = 0;
		b = x;
	}
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	return { R: r, G: g, B: b };
}

function rgbToHex(r, g, b) {
	r = r.toString(16);
	g = g.toString(16);
	b = b.toString(16);

	if (r.length == 1) r = "0" + r;
	if (g.length == 1) g = "0" + g;
	if (b.length == 1) b = "0" + b;

	return "#" + r + g + b;
}

// ----------display colors and info--------------
//display color in their boxes
function displayColor(firstColor, secondColor, thirdColor, fourthColor, fifthColor) {
	document.querySelector("#colorBox1").style.backgroundColor = firstColor;
	document.querySelector("#colorBox2").style.backgroundColor = secondColor;
	document.querySelector("#colorBox3").style.backgroundColor = thirdColor;
	document.querySelector("#colorBox4").style.backgroundColor = fourthColor;
	document.querySelector("#colorBox5").style.backgroundColor = fifthColor;
}

//display hex value
function displayHex(firstColor, secondColor, thirdColor, fourthColor, fifthColor) {
	document.querySelector("#hex1").textContent = firstColor.toUpperCase();
	document.querySelector("#hex2").textContent = secondColor.toUpperCase();
	document.querySelector("#hex3").textContent = thirdColor.toUpperCase();
	document.querySelector("#hex4").textContent = fourthColor.toUpperCase();
	document.querySelector("#hex5").textContent = fifthColor.toUpperCase();
}
//display rgb values
function displayRgb(firstColor, secondColor, thirdColor, fourthColor, fifthColor) {
	document.querySelector("#rgb1").textContent = `${firstColor.R}, ${firstColor.G}, ${firstColor.B}`;
	document.querySelector(
		"#rgb2"
	).textContent = `${secondColor.R}, ${secondColor.G}, ${secondColor.B}`;
	document.querySelector("#rgb3").textContent = `${thirdColor.R}, ${thirdColor.G}, ${thirdColor.B}`;
	document.querySelector(
		"#rgb4"
	).textContent = `${fourthColor.R}, ${fourthColor.G}, ${fourthColor.B}`;
	document.querySelector("#rgb5").textContent = `${fifthColor.R}, ${fifthColor.G}, ${fifthColor.B}`;
}

//display hsl values
function displayHsl(firstColor, secondColor, thirdColor, fourthColor, fifthColor) {
	document.querySelector("#hsl1").innerHTML = `${firstColor.H}, ${firstColor.S}%, ${firstColor.L}%`;
	document.querySelector(
		"#hsl2"
	).innerHTML = `${secondColor.H}, ${secondColor.S}%, ${secondColor.L}%`;
	document.querySelector("#hsl3").innerHTML = `${thirdColor.H}, ${thirdColor.S}%, ${thirdColor.L}%`;
	document.querySelector(
		"#hsl4"
	).innerHTML = `${fourthColor.H}, ${fourthColor.S}%, ${fourthColor.L}%`;
	document.querySelector("#hsl5").innerHTML = `${fifthColor.H}, ${fifthColor.S}%, ${fifthColor.L}%`;
}
