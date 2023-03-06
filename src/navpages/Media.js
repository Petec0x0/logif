/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';

const Media = () => {
  const [isImageReady, setImageReady] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [isSermonReady, setSermonReady] = useState(false);
  const [gallerySermons, setGallerySermons] = useState([]);

  useEffect(() => {
    // send a get request to the server to fetch galleryImages
    (async () => {
      const rawResponse = await fetch(`/api/media/get-images`, {
        method: 'GET',
      });
      const content = await rawResponse.json();
      // check if there is an error in the response
      if (content.error) {
        alert(content.message);
      } else {
        setGalleryImages([...content.data]);
        setImageReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // send a get request to the server to fetch gallerySermons
    (async () => {
      const rawResponse = await fetch(`/api/media/get-sermons`, {
        method: 'GET',
      });
      const content = await rawResponse.json();
      // check if there is an error in the response
      if (content.error) {
        alert(content.message);
      } else {
        setGallerySermons([...content.data]);
        setSermonReady(true);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Navbar />
      <div className="container mx-auto px-6 py-6">
        <h1 className="text-center text-2xl font-semibold capitalize text-gray-800 lg:text-3xl">
          Experience COJIM like never before with our Media Page
        </h1>

        <div className="mx-auto mt-6 flex justify-center">
          <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
          <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
          <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-500">
          Welcome to City of Jesus International Ministry's Media Page,
          where you can experience the power and presence of God from the comfort of your own home.
          Our page is packed with inspiring pictures, videos, and other
          multimedia content that will help you connect with God and grow in your faith.
        </p>
      </div>

      <section className="mx-6 md:mx-24">
        <h1 className="text-center my-4 text-xl font-semibold capitalize text-gray-800 lg:text-2xl">Our Latest Sermons</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div
            className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              src={`${isSermonReady ? gallerySermons[0].link : 'https://www.youtube.com/embed/bx7hosDBJEE'}`}
              allowFullScreen></iframe>
          </div>

          <div
            className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              src={`${isSermonReady ? gallerySermons[1].link : 'https://www.youtube.com/embed/3Cs4xKwkd6w'}`}
              allowFullScreen></iframe>
          </div>
          <div
            className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              src={`${isSermonReady ? gallerySermons[2].link : 'https://www.youtube.com/embed/--SKSM_mly0'}`}
              allowFullScreen></iframe>
          </div>

          <div
            className="embed-responsive embed-responsive-16by9 relative w-full overflow-hidden"
            style={{ paddingTop: "56.25%" }}>
            <iframe
              className="embed-responsive-item absolute top-0 right-0 bottom-0 left-0 h-full w-full"
              src={`${isSermonReady ? gallerySermons[3].link : 'https://www.youtube.com/embed/idOKZYUissI'}`}
              allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section className="mx-6 my-14 md:mx-24">
        <h1 className="text-center text-2xl font-semibold capitalize text-gray-800 lg:text-3xl">
          Our Social Media Pages
        </h1>
        <div className="mx-auto mt-6 flex justify-center">
          <span className="inline-block h-1 w-40 rounded-full bg-blue-500"></span>
          <span className="mx-1 inline-block h-1 w-3 rounded-full bg-blue-500"></span>
          <span className="inline-block h-1 w-1 rounded-full bg-blue-500"></span>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-gray-500">
          Stay connected with City of Jesus International Ministry and never miss a
          moment of our inspiring messages and events. Follow us on our social media pages to access all of
          our media content, including photos, videos, and more. Don't forget to like, share, and comment on
          our posts to join in the conversation and help spread the word of God to others. Check us out today and
          see what God is doing in the lives of our church community!
        </p>

        <div className="flex items-center justify-center space-x-2 mt-6">
          <a target="_blank" rel="noopener noreferrer" href="https://web.facebook.com/ChristopherOrjiMinistriesCOJIM?mibextid=ZbWKwL&_rdc=1&_rdr" className="text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="currentColor"
              style={{ color: "#1877f2" }}
              viewBox="0 0 24 24">
              <path
                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/cojimofficiel?t=gM2yvX_4GzUAgcdXD-rP8g&s=09" className="text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="currentColor"
              style={{ color: "#1da1f2" }}
              viewBox="0 0 24 24">
              <path
                d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/cojimofficiel/?igshid=YmMyMTA2M2Y%3D" className="text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="currentColor"
              style={{ color: "#c13584" }}
              viewBox="0 0 24 24">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@christopherorjiministries6459" className="text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="currentColor"
              style={{ color: "#ff0000" }}
              viewBox="0 0 24 24">
              <path
                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </a>

          <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@cojim?_t=8aMdh9hObgs&_r=1" className="text-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className="h-10 w-10"
              style={{ color: "#6a76ac" }}>
              <path
                fill="currentColor"
                d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
            </svg>
          </a>
        </div>
      </section>

      <section className="overflow-hidden text-neutral-700">
        <div className="container mx-auto px-5 py-2 lg:px-32 lg:pt-10">
          <h1 className="text-center my-4 text-xl font-semibold capitalize text-gray-800 lg:text-2xl">Gallery</h1>
          <div className="-m-1 flex flex-wrap md:-m-2">
            <div className="flex w-1/2 flex-wrap">
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[0].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930164/gallery/0Q0A1084_andvjf.jpg'}`} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[1].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930164/gallery/tes-min_p8yji6.jpg'}`} />
              </div>
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[2].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930167/gallery/0Q0A1081_bi2vsa.jpg'}`} />
              </div>
            </div>
            <div className="flex w-1/2 flex-wrap">
              <div className="w-full p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[3].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930160/gallery/0Q0A1107-min_estv3i.jpg'}`} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[4].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930165/gallery/img5-min_wv8msp.jpg'}`} />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <img
                  alt="gallery"
                  className="block h-full w-full rounded-lg object-cover object-center"
                  src={`${isImageReady ? galleryImages[5].link : 'https://res.cloudinary.com/cojim/image/upload/v1677930159/gallery/tes2-min_efmjp9.jpg'}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Media;
