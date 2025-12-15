[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/x6X7wJcH)
TODO: Fill this out with details about how to run your app!
# pizza-validator
A small TypeScript + Zod package for validating pizza objects.  
This package provides both:
- A programmatic validator (`validatePizza`)
- A command-line interface (`pizza-validator <file.json>`)
The goal is to check whether an unknown input matches the required Pizza schema, returning typed results and detailed validation errors.

## Installation as a dependency

```bash
npm install pizza-validator

## Usage as a Dependency 

```ts
import { validatePizza } from 'pizza-validator';

const result = validatePizza({
  size: 12,
  crust: 'normal',
  toppings: ['cheese', 'pepperoni']
});

if (result.isPizza) {
  console.log('Valid pizza! Crust:', result.pizza.crust);
} else {
  console.error('Invalid pizza:', result.errors);
}