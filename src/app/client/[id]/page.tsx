'use client'

import styles from "./page.module.scss";
import { useParams, useSearchParams } from "next/navigation";

export const dynamic = 'force-dynamic';

/*
備考: clientサイドでqueryParamsを取得する際には以下の手段も利用できる
const searchParams = useSearchParams();
const search = searchParams.get('query')
*/

/*
クライアントサイドでの、
(1) パスパラメータ・クエリパラメータの取得方法
(2) 環境変数の取得
(3) ヘッダーの取得
*/
export default function Page() {

  const pathParams = useParams();
  const searchParams = useSearchParams();
    
  // clientコンポーネントではサーバ側の環境変数を使うには、NEXT_PUBLIC_がprefixにないといけない
  const envData = process.env.NEXT_PUBLIC_CLIENT_ENV_TEST;
  
  // ヘッダーは取得できない？

  return (
    <main className={styles.main}>
      <h1>params</h1>
      <div className={styles.sentence}>
        <p>path: {pathParams.id}</p>
        <p>query: {searchParams.get('query')}</p>
        <p>envTest: {envData}</p>
      </div>
    </main>
  );
}
