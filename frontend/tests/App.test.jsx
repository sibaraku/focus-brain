import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from '../src/App';

describe('App vormide vahetamine', () => {
  it('näitab sisselogimise vormi vaikimisi', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
  });

  it('vahetab sisselogimise registreerimise vormi vastu', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('link', { name: 'Sign up' }));

    expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nickname')).toBeInTheDocument();
  });

});
