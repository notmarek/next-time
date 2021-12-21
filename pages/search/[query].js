import Head from "next/head";
import styles from "../../styles/Recent.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Recent() {
    const router = useRouter();
    const { query } = router.query;
    const { data, error } = useSWR(`/api/search?q=` + query, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    let elems = [];
    for (const anime of data.anime) {
        elems.push(
            <a href={"/anime/" + anime.link} className={styles.card}>
                <h2>{anime.name} &rarr;</h2>
            </a>
        );
    }
    return (
        <div className={styles.container}>
            <Head>
                <title>Next-time</title>
                <meta name="description" content="I am gonna kill myself" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to{" "}
                    <a href="https://github.com/notmarek/next-time">
                        Next-time!
                    </a>
                </h1>
                <div className={styles.grid}>{elems}</div>
            </main>
        </div>
    );
}
