import styles from "./page.module.scss";

// dynamic routingになっているので、以下の指定は不要
// export const dynamic = 'force-dynamic';

/*
備考: clientサイドでqueryParamsを取得する際には以下の手段も利用できる
const searchParams = useSearchParams();
const search = searchParams.get('query')
*/

export default function Page({
  params, searchParams
}: {
  params: {id: string}
  searchParams: {query: string}
}) {
  return (
    <main className={styles.main}>
      <h1>params</h1>
      <div className={styles.sentence}>
        <p>path: {params.id} </p>
        <p>query: {searchParams.query} </p>
      </div>
    </main>
  );
}
