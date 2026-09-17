import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Dashboard from '../src/components/Dashboard';

const statsResponse = { totalSessions: 4, totalTime: 100 };
const historyResponse = [
  { id: 1, start_time: '2026-09-15T10:00:00.000Z', duration: 25 },
];

const renderDashboard = () =>
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>,
  );

describe('Dashboard', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('nickname', 'Test User');
    globalThis.fetch = vi.fn((url) => {
      if (url.endsWith('/focus/stats')) {
        return Promise.resolve({ json: () => Promise.resolve(statsResponse) });
      }

      return Promise.resolve({ json: () => Promise.resolve(historyResponse) });
    });
  });

  it('kuvab rakenduse nime ja kasutajanime', async () => {
    renderDashboard();

    expect(screen.getByRole('heading', { name: 'BrainFocus' })).toBeInTheDocument();
    expect(await screen.findByText('Welcome, Test User!')).toBeInTheDocument();
  });

  it('kuvab taimeri algväärtuse 25:00', async () => {
    renderDashboard();

    await screen.findByText('Welcome, Test User!');
    expect(screen.getByText('25:00')).toBeInTheDocument();
  });

  it('kuvab taimeri START ja FINISH nupud', async () => {
    renderDashboard();

    expect(await screen.findByRole('button', { name: 'START' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'FINISH' })).toBeInTheDocument();
  });

  it('laadib ja kuvab statistika ning ajaloo API-st', async () => {
    renderDashboard();

    expect(await screen.findByText('Total sessions: 4')).toBeInTheDocument();
    expect(screen.getByText('Total time: 100 min')).toBeInTheDocument();
    expect((await screen.findAllByText(/25 min$/)).length).toBe(2);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/focus/stats',
      expect.objectContaining({ headers: expect.any(Object) }),
    );
  });
});
