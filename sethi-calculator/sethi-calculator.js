(function($) {
// Using a reference to the jquery prototype to extend the available methods via a plugin
$.fn.sethi_calculator = function() {
		// Appending a container div entitled sethi-calculator to the HTML entity (#sethi-calculator in this case)
		$(this).append("<div class='sethi-calculator'></div>");
		// Saving a reference to the container div
		let sethi_calculator_container = $(this).find("div.sethi-calculator");

		// Appending all required elements to the container div using a template literal string
		// Disabling the input field so that the user is restricted to the keypad shown
		$(sethi_calculator_container).append(`
			<button type="button" class="delete">CLOSE [x]</button>
			<input type="checkbox" name="keypad">Use Keypad ⌨
			<input class="input" type="textarea" disabled>
			<div class="grey clear col-sm-2 col-xs-2">C</div>
			<div class="button grey col-sm-2 col-xs-2">(</div>
			<div class="button grey col-sm-2 col-xs-2">)</div>
			<div class="button grey col-sm-3 col-xs-3">%</div>
			<div class="button orange col-sm-3 col-xs-3">&divide;</div>
			<div class="button lightgrey col-sm-3 col-xs-3">7</div>
			<div class="button lightgrey col-sm-3 col-xs-3">8</div>
			<div class="button lightgrey col-sm-3 col-xs-3">9</div>
			<div class="button orange col-sm-3 col-xs-3">x</div>
			<div class="button lightgrey col-sm-3 col-xs-3">4</div>
			<div class="button lightgrey col-sm-3 col-xs-3">5</div>
			<div class="button lightgrey col-sm-3 col-xs-3">6</div>
			<div class="button orange col-sm-3 col-xs-3">-</div>
			<div class="button lightgrey col-sm-3 col-xs-3">1</div>
			<div class="button lightgrey col-sm-3 col-xs-3">2</div>
			<div class="button lightgrey col-sm-3 col-xs-3">3</div>
			<div class="button orange col-sm-3 col-xs-3">+</div>
			<div class="button leftalign lightgrey col-sm-6 col-xs-6">0</div>
			<div class="button lightgrey col-sm-3 col-xs-3">.</div>
			<div class="orange equal col-sm-3 col-xs-3">=</div>
		`);

		// Setting the equation to an empty string
		let equation = '';

		// Click event listener to capture the clicked value and update the equation
		$(sethi_calculator_container).on("click", ".button", function() {
			// Appends innerText of clicked .button div to the equation string
			equation += $(this).context.innerText;
			// Setting the value of the input field to equal the updated equation string
			$(sethi_calculator_container).find('.input').val(equation);
		});

		// Click event listener to clear the equation 
		$(sethi_calculator_container).on("click", ".clear", function() {
			// Clears the equation string variable
			equation = '';
			// Setting the value of the input field to equal the blank equation string
			$(sethi_calculator_container).find('.input').val(equation);
		});

		// Creating array of required keypad keyCodes
		let keyCodes = [45, 46, 43, 42, 47, 37, 40, 41, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

		// Keypress event listener on window object
		$(window).on('keypress', function(e) {
			if($('input[name="keypad"]:checked').length > 0 && keyCodes.includes(e.keyCode)){
				// Appends innerText of clicked .button div to the equation string
				equation += e.key;
				// Setting the value of the input field to equal the updated equation string
				$(sethi_calculator_container).find('.input').val(equation);
			}
		});

		// Click event listener to evaluate the equation string
		$(sethi_calculator_container).on("click", ".equal", function() {
			// Capture the equation string in a variable
			let equationString = $(sethi_calculator_container).find('.input').val();
			// Cleanse the string by replacing the displayed x and ÷, with * and / respectively
			equationString = equationString.replace("x", "*");
			equationString = equationString.replace("÷", "/");
			// Cleanse the string by replacing % with /100
			equationString = equationString.replace("%", "/100");
			// Using the built-in JavaScript eval method to evaluate the equation
			// Re-assigning the equation to be the newly evaluated number (the new basis for the equation)
			equation = eval(equationString);
			// Setting the value of the input field to equal the evaluated number
			$(sethi_calculator_container).find('.input').val(equation);
		});

		// Hover event listener to slideToggle the delete button
		$(sethi_calculator_container).hover(function() {
			$(sethi_calculator_container).find('.delete').slideToggle();
		});

		// Corresponding click event handler to remove calculator on click of the delete button
		$(sethi_calculator_container).on("click", ".delete", function() {
			$(this).parent().remove();
		});

		// Return this to the JQuery prototype for further method chaining
		return this;
	};

}(jQuery));