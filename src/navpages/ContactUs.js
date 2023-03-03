import React from 'react';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';

const ContactUs = () => {
    return (
        <>
            <Navbar />
            <div class="container my-6 px-6 mx-auto">

                <section class="mb-32 text-gray-800">
                    <div class="block rounded-lg shadow-lg bg-white">
                        <div class="flex flex-wrap items-center">
                            <div class="grow-0 shrink-0 basis-auto block w-full lg:flex lg:w-6/12 xl:w-4/12">
                                <div class="map-container-2 w-full">
                                    <iframe title="COJIM Map" src="https://maps.google.com/maps?q=CITY+OF+JESUS+INTERNATIONAL+MINISTRY,+400104,+Enugu&t=&z=13&ie=UTF8&iwloc=&output=embed" class="left-0 top-0 h-full w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg" frameborder="0" allowfullscreen></iframe>
                                </div>
                            </div>

                            <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
                                <div class="grow-0 shrink-0 basis-auto m-4 mb-6 md:mb-0 w-full px-3 lg:px-6">
                                    <h2 class="text-3xl font-bold mb-6 text-primary">Contact us</h2>
                                    <p class="text-gray-500 mb-6">
                                        Welcome to Lovers of God International Foundation-LOGIF (Non Governmental Org) contact page.
                                        We're here to help answer any questions you may have about our organization and the work we do.
                                        Please feel free to reach out to us by using the contact information provided.
                                        We'll get back to you as soon as we can. Thank you for your interest in our cause!
                                    </p>
                                    <p class="text-gray-500 mb-2">
                                        IN/20 Emene Industrial Layout,
                                        Enugu East Local Government Area, Enugu State, Nigeria, West Africa
                                    </p>
                                    <p class="text-gray-500 mb-2">+ 234 704 331 5405</p>
                                    <p class="text-gray-500 mb-2">info@logif.org</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    )
}

export default ContactUs;