import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { ConnectionStatus } from './ConnectionStatus.component';

describe('ConnectionStatus', () => {
  afterEach(() => vi.restoreAllMocks());

  it('shows loading state initially', () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    render(<ConnectionStatus />);
    expect(screen.getByText('Checking...')).toBeInTheDocument();
  });

  it('shows online when health check succeeds', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 200 }));
    render(<ConnectionStatus />);
    expect(await screen.findByText('Backend Online')).toBeInTheDocument();
  });

  it('shows offline when health check fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));
    render(<ConnectionStatus />);
    expect(await screen.findByText('Backend Offline')).toBeInTheDocument();
  });
});
