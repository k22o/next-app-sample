# Next.js

## Cache戦略

https://nextjs.org/docs/app/building-your-application/caching

- **Request Memoization**
  - server-sideのキャッシュ
  - fetch APIを利用する際に有効になる
  - 同じリクエスト先へのfetchが複数回あった場合、リクエストは1回にまとめてくれる
  - 1回のレンダリング内でのみ機能するので、長期的なキャッシュとはならない
- **Data Cache**
  - server-sideのキャッシュ
  - fetch APIを利用する際に有効になる
  - APIのリクエスト結果をキャッシュする
  - デフォルトだと永続されるので、適宜revalidateやオプトアウトが必要
- **Full Route Cache**
  - server-sideのキャッシュ
  - リクエストされるURL単位でのキャッシュ
  - `static-route` ならデフォルトでキャッシュされ、`dynamic-route` ならキャッシュされない
    - 基本は`static-route`、クエリパラメータなどで動的に変化があるパスの場合は`dynamic-route`
    - 強制的に、`dynamic-route` 扱いすることも可能
  - デフォルトだと永続されるので、適宜revalidateやオプトアウトが必要
    - Data Cacheが更新されるタイミングで更新される
    - Data Cacheがオプトアウトされていればこちらもオプトアウトされる
- **Router Cache**
  - client-sideのキャッシュ
  - 保持時間は、ブラウザのセッション時間と、こちらで定めるprefetchの設定で定まる

## レンダリング手法

旧版(Pages Router)では、4つのレンダリング手法があった。

- Static Site Generator (SSG): あらかじめサーバー側でhtmlを作成し保存する
- Client Side Rendering (CSR): もとのReactに近い形
- Server Side Rendering (SSR): SSGのように保存はせず、client側に呼び出された後に非同期でデータを取得
- Increment Static Regeneration (ISR): SSGに基本的には同じ。一定時間が経過すると保存データを更新

App Router版では、以下のようにそれぞれの良いところ取りをした印象になっている

- 処理をできるだけサーバーに寄せる (SSR/SSG)
- Data Cacheのキャッシュ時間を調整することでISR的に使える
- クライアントサイドで動かすコードは明示して記述する (CSR)

## ルート用のファイル名

https://nextjs.org/docs/app/building-your-application/routing

- layout.tsx
  - 複数のルートで共有されるレイアウトを設定するファイル
- page.tsx
  - 表示するhtmlを記載した、メインのファイル
- template.tsx
  - layoutに近い働きをする
  - 詳細 -> https://nextjs.org/docs/app/building-your-application/caching#dynamic-functions
- error.tsx
- not-found.tsx
