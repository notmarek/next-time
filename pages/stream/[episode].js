import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Recent.module.css";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Stream() {
    const router = useRouter();
    const [ stream, setStream ] = useState("");
    const [ streams, setStreams ] = useState([]);
    const { episode } = router.query;
    const { data, error } = useSWR(`/api/stream?episode=${episode}`, fetcher);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    
    if (stream === "") {
        let strms = []
        for (const s of data.servers) { 
            strms.push(
                <option value={s.iframe}>{s.name}</option>
            )
        }
        setStreams(strms);
        setStream(data.servers[0].iframe);
    }

    const changeStream = (e) => {
        setStream(e.target.value);
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
                    <a id="nt" href="https://github.com/notmarek/next-time">
                        Next-time!
                    </a>
                </h1>

                <select onChange={(event) => changeStream(event)} className={styles.select}>
                    {streams}
                </select>
                
                <div className={styles.player}>
                   <iframe src={stream} allowFullScreen="true" frameBorder="0" marginWidth="0" marginHeight="0" scrolling="no"></iframe>
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
