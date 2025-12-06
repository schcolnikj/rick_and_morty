import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'first', delay: 500 },
    });

    expect(result.current).toBe('first');

    // Change value
    rerender({ value: 'second', delay: 500 });
    expect(result.current).toBe('first'); // Still old value

    // Fast forward time but not enough
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('first'); // Still old value

    // Fast forward past delay
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second'); // New value
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'first' },
    });

    // Rapid changes
    rerender({ value: 'second' });
    act(() => vi.advanceTimersByTime(300));

    rerender({ value: 'third' });
    act(() => vi.advanceTimersByTime(300));

    rerender({ value: 'fourth' });

    // Only the last value should be set after full delay
    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('fourth');
  });

  it('should work with different data types', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 42 },
    });

    expect(result.current).toBe(42);

    rerender({ value: 100 });
    act(() => vi.advanceTimersByTime(500));

    expect(result.current).toBe(100);
  });

  it('should respect custom delay', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'test', delay: 1000 },
    });

    rerender({ value: 'changed', delay: 1000 });

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('test');

    act(() => vi.advanceTimersByTime(500));
    expect(result.current).toBe('changed');
  });
});
