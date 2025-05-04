import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { fetchWithCache, fetchWithNoCache } from '../repositoryBase';

// モックサーバーの設定
const server = setupServer(
  http.get('https://api.example.com/data', () => {
    return HttpResponse.json([
      { id: 1, name: 'データ1' },
      { id: 2, name: 'データ2' },
    ]);
  })
);

describe('repositoryBase', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('fetchWithCache', () => {
    it('キャッシュ付きでデータを正しく取得できる', async () => {
      const result = await fetchWithCache('https://api.example.com/data');

      expect(result).toEqual([
        { id: 1, name: 'データ1' },
        { id: 2, name: 'データ2' },
      ]);
    });

    it('APIエラー時にundefinedを返す', async () => {
      server.use(
        http.get('https://api.example.com/data', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const result = await fetchWithCache('https://api.example.com/data');
      expect(result).toBeUndefined();
    });
  });

  describe('fetchWithNoCache', () => {
    it('キャッシュなしでデータを正しく取得できる', async () => {
      const result = await fetchWithNoCache('https://api.example.com/data');

      expect(result).toEqual([
        { id: 1, name: 'データ1' },
        { id: 2, name: 'データ2' },
      ]);
    });

    it('APIエラー時にundefinedを返す', async () => {
      server.use(
        http.get('https://api.example.com/data', () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const result = await fetchWithNoCache('https://api.example.com/data');
      expect(result).toBeUndefined();
    });
  });
});
