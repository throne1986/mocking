
import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../pages/Auth/Login';
import '@testing-library/jest-dom/extend-expect';

import { mockLogin } from '../../utils/api';
import axios from 'axios'

  
  
  jest.mock('axios', () => {
    return {
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() },
      },
    };
  });
  
  jest.mock('axios', () => ({
    __esModule: true,
    create: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    default:jest.fn()
  }));
  
  jest.mock("../../utils/api");


describe("Login form submit information with validated data", () => {
  beforeEach(() => {
    render(
    <Router>
        <Login  />
    </Router>
        
        );
  });
  

  it("should not display error when value is valid", async () => {
    fireEvent.input(
      screen.getByPlaceholderText("Business e-mail", { name: /email/i }),
      {
        target: {
          value: "test@mail.com"
        }
      }
    );
 
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: {
        value: "password"
      }
    });
 
    fireEvent.submit(screen.getByRole("button"));
 
    await waitFor(() =>
      expect(screen.queryAllByRole("alert-email, alert-password")).toHaveLength(
        0
      )
    );
    
    
       expect(mockLogin).toHaveBeenCalledWith("test@mail.com", "password");
    
       expect(screen.getByPlaceholderText("Password").value).toBe("");
    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Business e-mail", { name: /email/i }).value
      ).toBe("");
    })
  });


});

