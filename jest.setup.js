import '@testing-library/jest-dom'

// Mock para o window.matchMedia (necessário para alguns componentes responsivos ou bibliotecas)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // depreciado
    removeListener: jest.fn(), // depreciado
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
})
