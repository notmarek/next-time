import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Recent.module.css";
import useSWR from "swr";
import { useState } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Recent() {
    const [anime, setAnime] = useState([])
    
    const { data, error } = useSWR(`/api/home`, fetcher);
    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    
    console.log(data);
    let elems = [];
    const sw = (e, selected) => {
        console.log(selected);
        if (typeof e !== "undefined" && e !== null) {
            e.preventDefault();
            document
                .querySelector(`.${styles.selected}`)
                .classList.remove(styles.selected);
            e.target.classList.add(styles.selected);
        }
        elems = [];
        for (const ep of data.data[selected]) {
            elems.push(
                <a href={"/stream" + ep.link} className={styles.card}>
                    <h2>{ep.name} &rarr;</h2>
                    <p>{ep.episode}</p>
                </a>
            );
        }
        setAnime(elems);
    };
    if (anime.length === 0) {
        sw(null, "recent_releases");
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
                    <div
                        className={`${styles.button} ${styles.selected}`}
                        onClick={(event) => sw(event, "recent_releases")}
                    >
                        Recent
                    </div>{" "}
                    <div
                        className={styles.button}
                        onClick={(event) => sw(event, "recent_dubbed")}
                    >
                        Dubbed
                    </div>{" "}
                    <div
                        className={styles.button}
                        onClick={(event) => sw(event, "recent_chinese")}
                    >
                        Chinese
                    </div>
                </p>
                <div className={styles.grid}>{anime.length === 0 ? elems : anime}</div>
            </main>
        </div>
    );
}
