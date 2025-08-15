import { calculateLevel, getLevelTitle, calculateXPForNextLevel } from '../xp';

describe('XP System', () => {
  describe('calculateLevel', () => {
    it('calculates correct level for various XP amounts', () => {
      expect(calculateLevel(0)).toBe(1);
      expect(calculateLevel(50)).toBe(1);
      expect(calculateLevel(100)).toBe(2);
      expect(calculateLevel(250)).toBe(3); // 100 + 150
      expect(calculateLevel(450)).toBe(4); // 100 + 150 + 200
      expect(calculateLevel(700)).toBe(5); // 100 + 150 + 200 + 250
    });

    it('handles edge cases', () => {
      expect(calculateLevel(-1)).toBe(1);
      expect(calculateLevel(99)).toBe(1);
      expect(calculateLevel(100)).toBe(2);
    });
  });

  describe('getLevelTitle', () => {
    it('returns correct titles for different levels', () => {
      expect(getLevelTitle(1)).toBe('Startup Dreamer');
      expect(getLevelTitle(2)).toBe('Idea Explorer');
      expect(getLevelTitle(3)).toBe('Market Researcher');
      expect(getLevelTitle(5)).toBe('MVP Creator');
      expect(getLevelTitle(7)).toBe('Growth Hacker');
      expect(getLevelTitle(20)).toBe('Serial Entrepreneur');
    });

    it('returns highest title for very high levels', () => {
      expect(getLevelTitle(100)).toBe('Serial Entrepreneur');
    });
  });

  describe('calculateXPForNextLevel', () => {
    it('calculates progress correctly', () => {
      const progress150 = calculateXPForNextLevel(150);
      expect(progress150.current).toBe(50); // 150 - 100
      expect(progress150.required).toBe(150); // Next level requires 150 XP
      expect(progress150.percentage).toBe(33);

      const progress0 = calculateXPForNextLevel(0);
      expect(progress0.current).toBe(0);
      expect(progress0.required).toBe(100);
      expect(progress0.percentage).toBe(0);
    });

    it('handles exact level boundaries', () => {
      const progress = calculateXPForNextLevel(100);
      expect(progress.current).toBe(0);
      expect(progress.percentage).toBe(0);
    });
  });
});