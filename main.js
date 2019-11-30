
///// Utility functions

// Add last() method to Arrays
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

// Return a random integer from min to max inclusive
function randomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min; 
}

///// Custom Tracery modifiers 
// To let you prevent duplicate terminals and add "'s"

var customModifiers = {

	// Takes an expanded terminal and pushes it onto a global stack
	// to check against to prevent duplicates later in this grammar expansion
	// Make sure you clear the stack on each new generation.
	push : function(s) {
		stack.push(s);
		return s;
	},

	// Takes an expanded terminal and rule that it was expanded from
	// and checks it against all elements pushed to the stack so far
	// to ensure we get a new expansion of this rule relative to what
	// we've generated so far in this expansion.
	// TODO: add a variant that prepends with "other" if its the same terminal 
	new : function(s,rulename) {
		if (stack.length > 0) {
			// Keep rerolling the grammer at this rule until you get 
			// a result that isn't already in the stack
			let loopCount = 0;
			while (stack.includes(s) && loopCount <10) {
				s = grammar.flatten("#"+rulename+"#");
				loopCount++;
			}
			if (stack.includes(s)) {
				console.warn(`Failed to generate a unique terminal for #${rulename}# after ${loopCount} rerolls.`,
					`Using ${s} instead. Consider adding more possible values for #${rulename}#.`);
			}
		}
		return s;
	},

	// Make a given string possessive. Is there ever a case where this needs to be smarter?
	possessive : function (s) {
		return s + "'s";
	}

}

///// Main code

var seed, grammar;
var stack = []; // To keep track of what you don't want to repeat

function init() {
	// Initialize Tracery
	grammar = tracery.createGrammar(grammarRules);
	grammar.addModifiers(baseEngModifiers);
	grammar.addModifiers(customModifiers);
	document.getElementById('regenerateButton').addEventListener('click', generate); 
	generate();
}
init();

function generate () {	
	document.getElementById("generationZone").innerHTML = "";
	let n = 10;
	for (i=0; i<n; i++) {
		generateRule();
	}
}

function generateRule () {
	// Clear stack on new generation
	stack = [];

	let expandedTree = grammar.expand("#start#");
	//console.log(expandedTree);

	displayTextChunk(expandedTree.finishedText);
}

// Adds a given str to the HTML body
function displayTextChunk (str) {
	let p = document.createElement('p');
	p.innerText = str;
	document.getElementById("generationZone").appendChild(p);
}

