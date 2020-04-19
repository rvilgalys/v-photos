import Layout from "../components/Layout";
import ReactGallery from "react-photo-gallery";
import fs from "fs";
import path from "path";

const Gallery = ({ images, directories, gallery }) => {
  const galleryImages = images.map((image) => {
    const imgSet = require(`../images/${image.source}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`);
    return {
      src: imgSet.src,
      srcSet: imgSet.srcSet,
      width: imgSet.width,
      height: imgSet.height,
    };
  });

  const category = directories.map((dir) => (
    <a href={"/" + dir} className="px-2 bg-blue-200 text-gray-800">
      {dir}
    </a>
  ));

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-12 w-full">
        <h2 className="text-4xl text-gray-900"></h2>
        <div className="flex w-3/4 items-center justify-around p-4 border border-black my-4">
          <a href="/all">all</a>
          {category}
        </div>
        <div className="w-4/5 flex flex-col items-center bg-white p-4">
          <ReactGallery photos={galleryImages} margin={10}></ReactGallery>
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps({ params: { gallery = "all" } }) {
  const prefix = gallery === "all" ? "" : gallery;
  const context = require.context("../images", true, /\.jpg$/);
  const images = context
    .keys()
    .map((key) => ({
      source: key.slice(2),
    }))
    .filter((image) => image.source.startsWith(prefix));
  const imagesDir = path.join(process.cwd(), "images");
  const directories = fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  return {
    props: { images, directories, gallery },
  };
}

export async function getStaticPaths() {
  const imagesDir = path.join(process.cwd(), "images");
  const directories = fs
    .readdirSync(imagesDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => ({ params: { gallery: dirent.name } }));
  console.log(directories);

  return {
    paths: [...directories, { params: { gallery: "all", also: "this" } }],
    fallback: false,
  };
}

export default Gallery;
