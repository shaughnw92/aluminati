<template>
  <div id="app">
    <input
      ref="inputRef"
      :onchange="handleChange()"
      type="number"
      v-model="value"
      maxlength="2"
    />
    <div class="container">
      <div
        class="number"
        v-on:mouseenter="updateHoveredNumbers($event)"
        v-on:mouseleave="handleMouseLeave()"
        v-bind:key="ix"
        v-for="(number, ix) in numbers"
      >
        {{ number }}
      </div>
    </div>
  </div>
</template>

<script>
import { NUMBERS } from "./consts";

export default {
  name: "App",
  data() {
    return {
      numbers: NUMBERS,
      inputtedNumbers: [],
      hoveredNumbers: [],
      value: null
    };
  },
  methods: {
    multipleOf(numbersArray, value) {
      return numbersArray.filter(num => num % value === 0);
    },

    handleChange() {
      if (Number(this.value) > 50) this.value = this.value.slice(0, 1);
    },

    handleMouseLeave() {
      this.resetNumbers(this.hoveredNumbers);
      this.resetHighlightedNumbers("hover");
    },

    updateHoveredNumbers(e) {
      const number = e.target.textContent.trim();

      this.hoveredNumbers = this.multipleOf(this.numbers, Number(number));
      this.updateNumbersOnChange(this.hoveredNumbers, "hover");
    },

    updateInputtedNumbers() {
      this.inputtedNumbers = this.multipleOf(this.numbers, this.value);
    },

    updateNumbersOnChange(numbersArray, className) {
      const numberElements = document.querySelectorAll(".number");

      if (numbersArray.length === 0) return;

      numbersArray.forEach(highlightedNumber => {
        numberElements[highlightedNumber - 1].classList.add(className);
      });
    },

    resetNumbers(numbersArray) {
      numbersArray.length = 0;
      return numbersArray;
    },

    resetHighlightedNumbers(className) {
      const numberElements = document.querySelectorAll(".number");
      numberElements.forEach(element => element.classList.remove(className));
    }
  },
  updated() {
    if (String(this.value).length === 0) {
      this.resetNumbers(this.inputtedNumbers);
      this.resetHighlightedNumbers("inputted");
      return;
    }

    this.resetHighlightedNumbers("inputted");
    this.updateInputtedNumbers();
    this.updateNumbersOnChange(this.inputtedNumbers, "inputted");
  }
};
</script>

<style scoped>
.container {
  border: 1px solid black;
  display: block;
  width: 300px;
}

.number {
  background-color: #e3e3e3;
  color: black;
  display: inline-block;
  text-align: center;
  margin: 7.5px;
  padding: 7.5px;
  width: 30px;
}

.number:nth-of-type(1 + 5n) {
  display: block;
}

.hover {
  background-color: rgba(255, 0, 0, 0.5);
  color: black;
}

.inputted {
  background-color: red;
  color: white;
}
</style>
