import Layout from "../components/Layout";
import ReactGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { useState, useCallback } from "react";
import fs from "fs";
import path from "path";

const Gallery = ({ images, directories, gallery }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  });

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const galleryImages = images.map((image) => {
    const imgSet = require(`../images/${image.source}?resize&sizes[]=300&sizes[]=600&sizes[]=1000`);
    return {
      src: imgSet.src,
      srcSet: imgSet.srcSet,
      width: imgSet.width,
      height: imgSet.height,
    };
  });

  const category = directories.map((dir, index) => (
    <a
      href={"/" + dir}
      className={
        dir === gallery ? "px-2 text-gray-800 border" : "px-2 text-gray-800"
      }
      key={index}
    >
      {"#"}
      {dir}
    </a>
  ));

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center mt-12 w-full">
        <h1 className="text-4xl text-gray-900 ">VANESSA BURROWES</h1>
        <h2 className="text-2xl text-gray-900">PHOTOGRAPHER // Durham, NC</h2>
        <div className="flex w-full sm:w-4/5 items-center justify-around p-4 border border-black my-4">
          <a
            href="/all"
            className={
              gallery === "all"
                ? "px-2 text-gray-800 border"
                : "px-2 text-gray-800"
            }
          >
            #all
          </a>
          {category}
        </div>
        <div className=" w-full sm:w-4/5 flex flex-col items-center bg-white p-4">
          <ReactGallery
            photos={galleryImages}
            margin={10}
            onClick={openLightbox}
          ></ReactGallery>
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={galleryImages}
                  components={{
                    View: ({ data }) => (
                      <div className="w-1/2 m-auto">
                        <img src={data.src} srcSet={data.srcSet}></img>
                      </div>
                    ),
                  }}
                ></Carousel>
              </Modal>
            ) : null}
          </ModalGateway>
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
