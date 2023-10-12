const mockUsuario = {
    create: jest.fn(),
  };
  
  const getDatabaseConnection = jest.fn(() => ({
    usuario: mockUsuario,
  }));
  
  module.exports = { getDatabaseConnection, mockUsuario };
  