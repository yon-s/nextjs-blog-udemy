import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/Layout';
import utilStyle from "../styles/utils.module.css";
import { getPostsData } from '../lib/post';

//SSGの場合
export async function getStaticProps(){
  const allPostsData = getPostsData();
  console.log(allPostsData)

  return{
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  return ( 
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <sectiion className={utilStyle.headingMd}>
        <p>
          私はNextjsエンジニアです/好きなフレームワークはNext.jsです
        </p>
      </sectiion>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id, title, data, thumbnail}) =>(
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage}/>
            </Link>
            <Link href={`/posts/${id}`}>
              <a className={utilStyle.boldText}>{title}</a>
            </Link>
            <br/>
            <small className={utilStyle.lightText}>{data}</small>        
          </article>
        ))}
      </div>
      </section>
    </Layout>
   );
}
