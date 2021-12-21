import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
    if (typeof document == "undefined") {
    } else {
        let cur = 0;
        let its = [
            "shounen",
            "isekai",
            "yuri",
            "yaoi",
            "loli",
            "seinen",
            "josei",
            "shoujo",
            "scat",
            "mecha",
            "harem",
            "ecchi",
            "hentai",
            "nigger",
        ];

        setInterval(() => {
            if (its.length <= cur + 1) {
                cur = 0;
            } else {
                cur += 1;
            }
            document.getElementById("your-mom").innerText = its[cur];
        }, 1500);
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
                    Get started by watching some{" "}
                    <code className={styles.code} id="your-mom">
                        porn
                    </code>{" "}
                    anime.
                </p>

                <div className={styles.grid}>
                    <a href="/recent" className={styles.card}>
                        <h2>Recent Anime &rarr;</h2>
                        <p>
                            Find recently released anime, dubbed anime and even
                            chinee anime.
                        </p>
                    </a>

                    <a href="/browse" className={styles.card}>
                        <h2>Browse &rarr;</h2>
                        <p>
                            Browse all the anime available on your favorite site
                            called gogoanime.
                        </p>
                    </a>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://gogoanime.cm"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{" "}
                    <span className={styles.logo}>
                        <Image
                            src="/gogo.png"
                            alt="Gogoanime Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer>
        </div>
    );
}
