import { fetchSampleData } from '../sampleRepository';
import { fetchWithCache } from '../repositoryBase';

jest.mock('../repositoryBase', () => ({
  fetchWithCache: jest.fn(),
}));

describe('sampleRepository', () => {
  describe('fetchSampleData', () => {
    it('サンプルデータを正しく取得できる', async () => {
      const mockData = [
        { id: 1, name: 'サンプル1' },
        { id: 2, name: 'サンプル2' },
      ];

      (fetchWithCache as jest.Mock).mockResolvedValueOnce(mockData);

      const result = await fetchSampleData();

      expect(fetchWithCache).toHaveBeenCalledWith('https://api.example.com/sample');
      expect(result).toEqual(mockData);
    });
  });
}); 