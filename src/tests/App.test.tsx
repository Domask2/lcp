import React from 'react';

function sum(a: number, b: number) {
    return a * b;
}

test('adds 3 * 2 to equal 6', () => {
    expect(sum(3, 2)).toBe(6);
});
