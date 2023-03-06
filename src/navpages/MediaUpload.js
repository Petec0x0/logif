import ProgressBar from 'components/ProgressBar';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

const MediaUpload = () => {
    const [submitted, setSubmitted] = useState(false);
    const [galleryImages, setGalleryImages] = useState([0, 0, 0, 0, 0, 0]);
    const [gallerySermons, setGallerySermons] = useState([0, 0, 0, 0]);

    const handleSermonLinkChange = index => e => {
        console.log(index, e.target.value);
        let newArr = [...gallerySermons];
        newArr[index] = {
            ...newArr[index],
            link: e.target.value
        };
        setGallerySermons(newArr);
    }

    const handleImageLinkChange = index => e => {
        let newArr = [...galleryImages];
        newArr[index] = {
            ...newArr[index],
            link: e.target.value
        };
        setGalleryImages(newArr);
    }

    const handleUpdateSermon = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // send a patch request to the server to update member
        (async () => {
            const rawResponse = await fetch('/api/media/update-sermons', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gallerySermons: gallerySermons,
                })
            });
            const content = await rawResponse.json();
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setSubmitted(false);
            }
        })();
    }

    const handleUpdateImages = (e) => {
        e.preventDefault();
        setSubmitted(true);
        // send a patch request to the server to update member
        (async () => {
            const rawResponse = await fetch('/api/media/update-images', {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    galleryImages: galleryImages,
                })
            });
            const content = await rawResponse.json();
            // check if there is an error in the response
            if (content.error) {
                alert(content.message);
            } else {
                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setSubmitted(false);
            }
        })();
    }


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
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="font-sans bg-gray-500 bg-opacity-60 w-full min-h-screen flex justify-center flex items-center h-full top-0 backdrop-filter backdrop-blur-lg">
                <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
                <div className="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto w-full lg: mx-5 lg:h-1/3 rounded-3xl filter drop-shadow-2xl">
                    <div className="mt-3">
                        <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
                            Sermon YouTube Links
                        </h1>
                    </div>
                    <div className="mt-1">
                        <form action="" className="flex-col flex">
                            {gallerySermons.map((datum, index) => {
                                return (<div key={index}>
                                    <label htmlFor="videoLink1" className="text-gray-700 text-xs sm:text-md">Link {index}</label>
                                    <input onChange={handleSermonLinkChange(index)} value={datum.link} name="videoLink1" type="text" className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
                                </div>)
                            })}

                        </form>
                    </div>
                    {
                        // show the progress bar if data is submited and being processed
                        (submitted) ? (
                            <div className="bg-gray-900">
                                <ProgressBar />
                            </div>
                        ) : ""
                    }
                    <div className="justify-center flex-col items-center mt-2 sm:mt-8 flex">
                        <button onClick={handleUpdateSermon} className="bg-blue-600 text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xs sm:text-md sm:p-3">
                            Update
                        </button>
                    </div>
                </div>
            </div>

            <div className="font-sans bg-gray-500 bg-opacity-60 w-full min-h-screen flex justify-center flex items-center h-full top-0 backdrop-filter backdrop-blur-lg">
                <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />
                <div className="px-6 p-2 bg-white relative justify-center items-center w-1/2 m-auto mx-auto w-full lg: mx-5 lg:h-1/3 rounded-3xl filter drop-shadow-2xl">
                    <div className="mt-3">
                        <h1 className="text-xl text-gray-600 tracking-wider text-sm sm:text-md font-black">
                            Gallery Image Links
                        </h1>
                    </div>
                    <div className="mt-1">
                        <form action="" className="flex-col flex">
                            {galleryImages.map((datum, index) => {
                                return (
                                    <div key={index}>
                                        <label htmlFor="videoLink1" className="text-gray-700 text-xs sm:text-md">Link {index}</label>
                                        <input onChange={handleImageLinkChange(index)} value={datum.link} name="videoLink1" type="text" className="w-full h-4 sm:h-9 border-b-2 border-gray-300 focus:border-blue-300 outline-none" />
                                    </div>
                                )
                            })}

                        </form>
                    </div>
                    {
                        // show the progress bar if data is submited and being processed
                        (submitted) ? (
                            <div className="bg-gray-900">
                                <ProgressBar />
                            </div>
                        ) : ""
                    }
                    <div className="justify-center flex-col items-center mt-2 sm:mt-8 flex">
                        <button onClick={handleUpdateImages} className="bg-blue-600 text-gray-100 rounded-md h-8 sm:h-auto sm:rounded-lg w-20 sm:w-52 p-1 text-xs sm:text-md sm:p-3">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MediaUpload;