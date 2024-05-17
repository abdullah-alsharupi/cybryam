import Link from "next/link";
import Image from "next/image";
import './page.modul.css';
export default function Blog(){

    return (
        <div className="containerBlog">
<Link href="/id" className="post">
    <div className="containerImage">
        <Image src={"https://dean-www.s3.amazonaws.com/files/news/wide-sml-academics-5.jpg"} 
        alt="post image" width={350} height={250}/>
         <Image src={"https://dean-www.s3.amazonaws.com/files/news/wide-sml-academics-5.jpg"} 
        alt="post image" width={350} height={250}/>
         <Image src={"https://dean-www.s3.amazonaws.com/files/news/wide-sml-academics-5.jpg"} 
        alt="post image" width={350} height={250}/>
    </div>
    <div className="content">
        <h1 className="title">post title</h1>
        <p className="text">post Text</p>
    </div>
</Link>

        </div>
    );
}