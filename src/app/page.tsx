import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main className={styles.main}>
      <nav>
        <ul>
          <li><Link href="/envTestPage">環境変数のテストページ</Link></li>
          <li><Link href="/paramsTestPage/123?query=abc">パス・クエリパラメータのテストページ</Link></li>
          <li><Link href="/headerTestPage">リクエストヘッダーのテストページ</Link></li>
          <li><Link href="/dummy">404ページ</Link></li>
          <li><Link href="/paramsTestPage/1234?query=abc">500ページ</Link></li>
          <li><Link href="/api?query=q">route handlerのテストページ</Link></li>
        </ul>
      </nav>
    </main>
  );
}
