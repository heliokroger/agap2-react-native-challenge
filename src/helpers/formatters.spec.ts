import {
  convertRuntimeToHours,
  separateGenresByComma,
  getYearFromPremieredDate,
  removeHTMLFromString,
} from '@helpers';

describe('testing formatters', () => {
  describe('testing convertRuntimeToHours', () => {
    it('should return the time formatted in hours and minutes', () => {
      const runtime = 121;
      const result = convertRuntimeToHours(runtime);
      expect(result).toBe('2hr 1min');
    });

    it('should return only hours if theres no remaining minutes', () => {
      const runtime = 60;
      const result = convertRuntimeToHours(runtime);
      expect(result).toBe('1hr');
    });

    it('should return only minutes if theres less than 60 minutes', () => {
      const runtime = 50;
      const result = convertRuntimeToHours(runtime);
      expect(result).toBe('50min');
    });
  });

  describe('testing getYearFromPremieredDate', () => {
    it('should return the year from the premiered date', () => {
      const result = getYearFromPremieredDate('1998-1-1');
      expect(result).toBe('1998');
    });
  });

  describe('testing separateGenresByComma', () => {
    it('should return a string of genres joined by a comma', () => {
      const result = separateGenresByComma(['Action', 'Thriller']);
      expect(result).toBe('Action, Thriller');
    });
  });

  describe('testing removeHTMLFromString', () => {
    it('should return the string without HTML tags', () => {
      const html = '<p>Plain text</p>';
      const result = removeHTMLFromString(html);
      expect(result).toBe('Plain text');
    });
  });
});
