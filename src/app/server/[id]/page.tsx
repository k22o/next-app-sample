import { headers } from "next/headers";
import styles from "./page.module.scss";

// dynamic routingになっているので、以下の指定は不要
// export const dynamic = 'force-dynamic';

/*
備考: clientサイドでqueryParamsを取得する際には以下の手段も利用できる
const searchParams = useSearchParams();
const search = searchParams.get('query')
*/

/*
サーバーサイドでの、
(1) パスパラメータ・クエリパラメータの取得方法
(2) 環境変数の取得
(3) ヘッダーの取得
*/
export default function Page({
  params, searchParams
}: {
  params: {id: string}
  searchParams: {query: string}
}) {

  if(params.id.length != 3) {
    throw new Error("idが不適切です。");
  }

  // server componentだと、サーバー側で設定した環境変数を取得できる
  const envData = process.env.ENV_TEST;
  // server componentだと、以下のメソッドで取得できる
  const headersList = headers();

  return (
    <main className={styles.main}>
      <h1>params</h1>
      <div className={styles.sentence}>
        <p>path: {params.id}</p>
        <p>query: {searchParams.query}</p>
        <p>envTest: {envData}</p>
        <p>userAgent: {headersList.get('User-Agent')}</p>
      </div>
    </main>
  );
}
