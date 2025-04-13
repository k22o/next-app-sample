import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
  return (
    <main className={styles.main}>
      <nav>
        <ul>
          <li><Link href="/server/123?query=abc">サーバーサイドでの変数の取得方法</Link></li>
          <li><Link href="/client/123?query=abc">クライアントサイドでの変数の取得方法</Link></li>
          <li><Link href="/dummy">404ページ</Link></li>
          <li><Link href="/server/1234?query=abc">500ページ</Link></li>
          <li><Link href="/api?query=q">route handlerのテストページ</Link></li>
        </ul>
      </nav>
    </main>
  );
}
