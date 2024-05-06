import { headers } from "next/headers";
import styles from "./page.module.scss";

export const dynamic = 'force-dynamic';

// pageでなくとも、どこで呼び出しても使える
// わざわざ、pageで呼び出し -> componentに値を引き継ぐ、というプロセスをしなくてもいいはず
const headersList = headers();

export default function Page() {
  return (
    <main className={styles.main}>
      <h1>headers</h1>
      <div className={styles.sentence}>
        <p>userAgent: {headersList.get('User-Agent')} </p>
      </div>
    </main>
  );
}

// ******** おまけ ********
// レスポンスヘッダは、next.config.mjsで記述している