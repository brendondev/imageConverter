/**
 * @jest-environment jsdom
 */

const { showMessage } = require('./app');

describe('showMessage', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="message-container"></div>';
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('adds and removes show class after 3 seconds', () => {
    const message = 'testing';
    showMessage(message);
    const container = document.getElementById('message-container');
    expect(container.classList.contains('show')).toBe(true);
    expect(container.textContent).toBe(message);
    jest.advanceTimersByTime(3000);
    expect(container.classList.contains('show')).toBe(false);
    expect(container.textContent).toBe('');
  });
});
