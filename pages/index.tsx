// pages/index.tsx
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { DrupalNode } from "next-drupal";
import { useEffect } from "react";
import drupal from "utils/client";
import Link from "next/link";

interface IndexPageProps {
  nodes: DrupalNode[];
}

export default function IndexPage({ nodes }: IndexPageProps) {
  console.log("nodes", nodes);

  return (
    <>
      <Head>
        <title>Next.js for Drupal</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      <div>
        {nodes?.map((node) => (
          <Link href={`/article/${node.id}`} key={node.id}>
            <li>{node.title}</li>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const nodes = await drupal.getResourceCollection<DrupalNode[]>(
    "node--article"
  );
  return { props: { nodes } };
}
