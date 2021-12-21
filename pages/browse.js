import Head from "next/head";
import styles from "../styles/Recent.module.css";

export default function Recent() {
    
    const search = () => {
        document.location.href = "/search/" + encodeURIComponent(document.getElementById("search").value);
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
                <form className={styles.searchform} onSubmit={(event) => {event.preventDefault(); search(); return false;}}>
                    <input className={styles.search} id="search" placeholder="Query" type="text"/>
                    <input type="submit" value="Search" className={styles.srchbtn} />
                </form>

            </main>
        </div>
    );
}
