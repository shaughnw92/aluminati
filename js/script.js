// Array of numbers
const numbersArray = Array.from({ length: 50 }, (_, ix) => ix + 1)

// DOM Elements
const container = document.querySelector('.container')
const input = document.querySelector('.input')

// InnerHTML for Container
const numbers = numbersArray.map(
	(number, ix) =>
		`<div key=${ix + 1} class='number'>
    ${String(number)}
    </div>`
)

// Function for getting multiples
/**
 * Filters array of numbers by multiples
 * @param {[number]} numbers array of numbers
 * @param {number} multiple the multiple to filter numbers array by
 * @returns an array of multiples of the number passed
 */
const multiplesOf = (numbers, multiple) =>
	numbers.filter(num => num % multiple === 0)

// Setting innerHTML of container
container.innerHTML = numbers
container.innerHTML = container.innerHTML.replaceAll(',', '')

// Event handler for "input" or key change
const handleKeyChange = e => {
	if (Number(e.target.value) > 50) input.value = e.target.value.slice(0, 1)
	const multiplesOfValue = multiplesOf(numbersArray, Number(e.target.value))

	container.childNodes.forEach((_, ix) => {
		container.children[ix].classList.remove('inputted')
	})

	multiplesOfValue.forEach(multiple => {
		const classList = container.childNodes[multiple - 1].classList
		if (!classList.contains('inputted')) classList.add('inputted')
	})
}

// Event handler for hover - mouseenter/mouseleave
const handleHover = e => {
	if (e.target.classList === undefined) return
	const number = e.target.textContent.trim()
	const multiplesOfValue = multiplesOf(numbersArray, Number(number))
	const multiplesOfInputValue = multiplesOf(numbersArray, Number(input.value))

	multiplesOfValue.forEach(multiple => {
		const classList = container.childNodes[multiple - 1].classList

		if (e.type === 'mouseenter') {
			if (!classList.contains('hover')) classList.add('hover')
			if (!e.target.classList.contains('hover')) classList.remove('hover')
		} else if (e.type === 'mouseleave') {
			if (classList.contains('hover')) classList.remove('hover')
		}
	})

	multiplesOfInputValue.forEach(multiple => {
		const classList = container.childNodes[multiple - 1].classList
		if (input.value.length > 0) classList.add('hover')
	})
}

// Event Listeners added
input.addEventListener('input', e => handleKeyChange(e))
document.addEventListener('mouseenter', e => handleHover(e), true)
document.addEventListener('mouseleave', e => handleHover(e), true)
