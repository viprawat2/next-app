// pages/index.tsx
import { DrupalNode } from "next-drupal";
import Head from "next/head";
import drupal from "utils/client";

export default function IndexPage(props: any) {
  const { article } = props;
  console.log("context", props, article);
  return (
    <>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>{article?.title}</div>
      <p>{article.body?.value}</p>
    </>
  );
}

export async function getStaticPaths() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article"
  );

  const paths = nodes.map((node) => ({
    params: {
      id: node.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const article = await drupal.getResource("node--article", params.id);
  console.log("article", article);

  return { props: { article: article }, revalidate: 10 };
}
