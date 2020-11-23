const mockLogin = jest.fn((email, password) => {
    return Promise.resolve({ email, password });
  });
   
  const errors = jest.fn((errors) =>{
     return errors
  });

  module.exports =
    {
    ...jest.requireActual("../../utils/api"),
    __esModule: true,
    mockLogin,
    post: mockLogin,
    catchErrors:errors
  }
