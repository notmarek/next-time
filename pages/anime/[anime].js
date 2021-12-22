import Head from "next/head";
import styles from "../../styles/Recent.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Anime() {
    const router = useRouter();
    const { anime } = router.query;
    const { data, error } = useSWR(`/api/anime?anime=` + anime, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    let elems = [];
    for (const ep of data.episodes) {
        elems.push(
            <a href={"/stream/" + ep.id} className={styles.card}>
                <h2>{ep.name} &rarr;</h2>
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
                <p className={styles.description}>
                    {data.name}
                </p>
                <div className={styles.grid}>{elems}</div>
            </main>
        </div>
    );
}
