import { useRouter } from "next/router";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((res) => res.json());
const Post = () => {
    const router = useRouter();
    const { episode } = router.query;
    const { data, error } = useSWR(`/api/stream?episode=${episode}`, fetcher);
    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    let page = [<h1>Hello world</h1>];
    console.log(data)
    for (const strm of data.servers) {
        page.push(<iframe src={strm.iframe} allowfullscreen="true" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>);
    }
    return page;
};

export default Post;
