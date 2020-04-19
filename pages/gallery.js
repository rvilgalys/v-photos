import Layout from "../components/Layout";
import ReactGallery from "react-photo-gallery";

const Gallery = ({ images }) => {
  console.log(images);
  const galleryImages = images.map((image) => {
    const imgSet = require(`../images/${image.source}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`);
    console.log(imgSet);
    return {
      src: imgSet.src,
      srcSet: imgSet.srcSet,
      width: imgSet.width,
      height: imgSet.height,
    };
  });

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-12">
        <h2 className="text-4xl text-gray-900">Gallery</h2>
        <ReactGallery photos={galleryImages}></ReactGallery>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const context = require.context("../images", true, /\.jpg$/);
  const images = context.keys().map((key) => ({
    source: key.slice(2),
    width: 4,
    height: 3,
  }));
  console.log(images);
  return {
    props: { images },
  };
}

export default Gallery;
