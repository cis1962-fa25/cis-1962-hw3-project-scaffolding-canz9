import { validatePizza } from '../src/pizza';

describe('validatePizza', () => {
  it('accepts a valid pizza', () => {
    const input = {
      size: 14,
      crust: 'stuffed',
      toppings: ['cheese', 'mushroom']
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(true);
    if (result.isPizza) {
      expect(result.pizza.size).toBe(14);
      expect(result.pizza.crust).toBe('stuffed');
      expect(result.pizza.isDeepDish).toBe(false); // default value
    }
  });

  it('rejects a pizza with negative size', () => {
    const input = {
      size: -10,
      crust: 'normal'
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(result.errors.some((e) => e.includes('size'))).toBe(true);
    }
  });

  it('rejects a pizza with banned toppings', () => {
    const input = {
      size: 12,
      crust: 'normal',
      toppings: ['cheese', 'glass']
    };

    const result = validatePizza(input);

    expect(result.isPizza).toBe(false);
    if (!result.isPizza) {
      expect(
        result.errors.some((e) =>
          e.toLowerCase().includes('topping "glass" is not allowed')
        )
      ).toBe(true);
    }
  });
});