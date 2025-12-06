import { renderHook, act } from '@testing-library/react';
import { useCharacterStore } from '@/store/characterStore';
import { beforeEach, describe, expect, it } from 'vitest';

describe('useCharacterStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useCharacterStore());
    act(() => {
      result.current.setCharacterA(null);
      result.current.setCharacterB(null);
    });
  });

  it('should initialize with null characters', () => {
    const { result } = renderHook(() => useCharacterStore());

    expect(result.current.characterA).toBeNull();
    expect(result.current.characterB).toBeNull();
  });

  it('should set character A', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setCharacterA('1');
    });

    expect(result.current.characterA).toBe('1');
    expect(result.current.characterB).toBeNull();
  });

  it('should set character B', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setCharacterB('2');
    });

    expect(result.current.characterA).toBeNull();
    expect(result.current.characterB).toBe('2');
  });

  it('should set both characters independently', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setCharacterA('1');
      result.current.setCharacterB('2');
    });

    expect(result.current.characterA).toBe('1');
    expect(result.current.characterB).toBe('2');
  });

  it('should update character A without affecting character B', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setCharacterA('1');
      result.current.setCharacterB('2');
    });

    act(() => {
      result.current.setCharacterA('3');
    });

    expect(result.current.characterA).toBe('3');
    expect(result.current.characterB).toBe('2');
  });

  it('should allow deselecting characters by setting to null', () => {
    const { result } = renderHook(() => useCharacterStore());

    act(() => {
      result.current.setCharacterA('1');
      result.current.setCharacterB('2');
    });

    act(() => {
      result.current.setCharacterA(null);
    });

    expect(result.current.characterA).toBeNull();
    expect(result.current.characterB).toBe('2');
  });

  it('should persist state across multiple hook calls', () => {
    const { result: result1 } = renderHook(() => useCharacterStore());

    act(() => {
      result1.current.setCharacterA('1');
    });

    // New hook instance should see the same state
    const { result: result2 } = renderHook(() => useCharacterStore());

    expect(result2.current.characterA).toBe('1');
  });
});
