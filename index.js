function Constructor () {
	this.mode = 'single'
	this.memory = {}
}

// toggle single / multi
Constructor.prototype.changeMode = function(mode) {
	if (mode === 'single') this.mode = 'single';
	else this.mode = 'multi';
	// clear the memory
	this.memory = {}
};

// calculate the 25% markup
Constructor.prototype.calculate25 = function(num) {
	return num * 25 / 100
};

// takes input number, renders output, using the 'calculate25' method
Constructor.prototype.giveOutput = function (num) {
	return this.calculate25(num);
}

// add input to the memory object
Constructor.prototype.addToMem = function (prop, inputValue) {
	// initialize if doesn't already exist
	this.memory[prop] = this.memory[prop] || {};
	// change the price input in memory
	this.memory[prop].price = inputValue
	// calculate the markup, and take into account edge cases
	if (typeof inputValue != 'number' || inputValue < 0 || !inputValue) {
		this.memory[prop].markup = 0;
	} else {
		this.memory[prop].markup = this.giveOutput(inputValue)
	}
}

var obj = new Constructor();

// event delegation : on clicking mode buttons, change the mode of the instance 'obj'
document.getElementById('toggleButtons').addEventListener('click', 
	function (e) {
		var mode = e.target.getAttribute('id').toString()
		var lastButton = document.getElementById('calculateAll')
		// call the changeMode method
		obj.changeMode.call(obj, mode);
		// show/hide 'calculateAll' button depending on current mode
		if (obj.mode === 'single') {
			lastButton.style.visibility = "hidden";
		} else {
			lastButton.style.visibility = 'visible';
		}
	}
)

// single mode : calculate output directly after input with event delegation
document.getElementById('inputs').addEventListener('input',
	function (e) {
		var item = e.target.getAttribute('id').toString()
		var itemPrice = parseInt(e.target.value)
		// add to memory the item and the price inputed
		obj.addToMem.call(obj, item, itemPrice)
		// change markup according to updated memory
		var outputLocation = e.target.parentNode.childNodes[7]
		var markupValue = obj.memory[item].markup
		outputLocation.innerHTML = markupValue
	}
)




