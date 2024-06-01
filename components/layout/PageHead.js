import Head from "next/head";

const PageHead = ({ headTitle }) => {
  return (
    <>
      <Head>
        <title>{headTitle ? headTitle : "Premium Logistics"}</title>
        <link rel="shortcut icon" href="/favicon_1.svg" />
      </Head>
    </>
  );
};

export default PageHead;
