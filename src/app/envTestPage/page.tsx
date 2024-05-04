import styles from "./page.module.scss";

export const dynamic = 'force-dynamic';
const envTest = process.env.ENV_TEST

export default function Introduction() {
  return (
    <main className={styles.main}>
      <h1>introduction</h1>
      <div className={styles.sentence}>
        <p>envTest: {envTest} </p>
      </div>
    </main>
  );
}
