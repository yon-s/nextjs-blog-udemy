import Layout from "@/components/Layout";
import {getAllpostIds, getPostData } from "@/lib/post";
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head";

export async function getStaticPaths() {
  //ブログ投稿データのファイル名(id)を取得。
  const paths = getAllpostIds();

  return {
    paths, //どのパスが事前にレンダリングされるのか決める。
    fallback: false, //あとで説明。(falseにすると、上のpathsに含まれてないあらゆるパスはアクセスすると404ページになる。)
  };
}

export async function getStaticProps({params}){
  const  postData = await getPostData(params.id);
  return{
    props:{
      postData,
    }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
      <h1 className={utilStyles.headingX1}>{postData.title}</h1>
      <div className={utilStyles.lightText}> {postData.date}</div> 
      <div dangerouslySetInnerHTML={{__html: postData.blogContentHTML}}/>
      </article>
      
    </Layout>
  );
}
