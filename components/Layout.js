import Head from "next/head";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Vanessa's Photos</title>
      <link rel="stylesheet" href="https://use.typekit.net/wcy5muc.css"></link>
    </Head>
    {children}
  </>
);

export default Layout;
