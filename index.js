function Constructor () {
	this.mode = 'single'
	this.memory = {}
}

// toggle single / multi
Constructor.prototype.changeMode = function(mode) {
	if (mode === 'single') {
		this.mode = 'single';
		this.multiCalled(false)
		document.getElementById('single').classList.add('activeButton')
		document.getElementById('multi').classList.remove('activeButton')
	}
	else {
		this.mode = 'multi';
		// clear the memory
		this.memory = {}
		document.getElementById('multi').classList.add('activeButton')
		document.getElementById('single').classList.remove('activeButton')
	}
};

// tracks if calculateAll has been called or not
Constructor.prototype.multiCalled = function (bool) {
	this.calculateAllCalled = bool;
}

// hide/show element depending on current state
Constructor.prototype.hideShow = function (element) {
	if (this.mode === 'single') {
			element.style.visibility = "hidden";
		} else {
			element.style.visibility = 'visible';
		}
}

// calculate the 25% markup
Constructor.prototype.calculate = function(num, percentage) {
	return num * percentage / 100
};

// takes input number, renders output, using the 'calculate' method
Constructor.prototype.giveOutput = function (num) {
	return this.calculate(num, 25);
}

// add input to the memory object
Constructor.prototype.addToMem = function (prop, inputValue) {
	// initialize if doesn't already exist
	this.memory[prop] = this.memory[prop] || {};
	// change the price input in memory
	this.memory[prop].price = inputValue
	// calculate the markup, and take into account edge cases
	if (typeof inputValue != 'number' || inputValue < 0) {
		this.memory[prop].markup = 0;
	} else if (!inputValue) {
		this.memory[prop].markup = '';
	} else {
		this.memory[prop].markup = this.giveOutput(inputValue)
	}
}

// clear all the outputs on the frontend
Constructor.prototype.clear = function (className, mode) {
	// if change of state or in multi mode, when input is changed
	if (mode.toString() != this.mode.toString() || (mode.toString() == 'multi')) {
		// transform array-like object to array
		var arr = Array.prototype.slice.call(document.getElementsByClassName(className))
		// loop through arr and clear each output
		arr.forEach(function (element) {
			element.style.color = 'black';
			element.value = ''
		})
	}
}

// attach markup value to frontend
Constructor.prototype.attachMarkup = function (item, outputLocation) {
	var markupValue = this.memory[item].markup
	outputLocation.value = markupValue;
	// special item edge case
	if (outputLocation.value > 1000) {
		outputLocation.style.color = 'red';
		outputLocation.style.fontWeight = 'bold';
	} else {
		outputLocation.style.color = 'black';
		outputLocation.style.fontWeight = 'normal';
	}
}

// renders all outputs at once on clicking button 'calculate all'
Constructor.prototype.renderAll = function () {
	var self = this;
	// get all inputs filled from memory
	var arr = Object.keys(this.memory)
	// loop over it to render each
	arr.forEach(function(prop) {
		// select the output for each element where there is an input
		var outputLocation = document.getElementById(prop).parentNode.childNodes[7]
		// attach markup on each line
		self.attachMarkup(prop, outputLocation)
	})
}

var obj = new Constructor();


// event delegation : on clicking mode buttons, change the mode of the instance 'obj'
document.getElementById('toggleButtons').addEventListener('click', 
	function (e) {
		var mode = e.target.getAttribute('id').toString()
		var lastButton = document.getElementById('calculateAll')
		// clear all inputs and outputs when change mode
		obj.clear('output', mode)
		obj.clear('inputVal', mode)
		// call the changeMode method
		obj.changeMode(mode)
		// show/hide 'calculateAll' button
		obj.hideShow(lastButton)
	}
)

// calculate output after input in different ways depending on current mode
document.getElementById('inputs').addEventListener('input',
	function (e) {
		var item = e.target.getAttribute('id').toString()
		var itemPrice = parseInt(e.target.value)
		var outputLocation = e.target.parentNode.childNodes[7]
		// add to memory the item and the price inputed
		obj.addToMem.call(obj, item, itemPrice)
		if (obj.mode == 'single') {
			// change markup according to updated memory
			obj.attachMarkup(item, outputLocation)
		} else {
			// clear outputs when 'calculateAll' has been called already
			if (obj.calculateAllCalled) {
				obj.clear('output', obj.mode)
			}
		}
	}
)

// render all outputs at once on clicking the 'calculateAll' button
document.getElementById('calculateAll').addEventListener('click',
	function (e) {
		obj.multiCalled(true)
		obj.renderAll()
	}
)



