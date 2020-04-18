import Head from "next/head";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Vanessa's Photos</title>
    </Head>
    {children}
  </>
);

export default Layout;
