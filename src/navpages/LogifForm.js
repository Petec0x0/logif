import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import ProgressBar from 'components/ProgressBar';
import Footer from 'components/footer/Footer';
import Navbar from 'components/navbar/Navbar';

const LogifForm = () => {
    // states htmlFor storing form data
    const [formInputData, setFormInputData] = useState({
        fullname: '', age: '', state: '', email: '',
        occupation: '', nationality: '', residentialAddress: '', phone: '',
        gender: '', lga: '', village: '', maritalStatus: '', schoolName: '',
        schoolAddress: '', schoolLevel: '', courseOfStudy: '',
        disabilities: '', currentCondition: '', currentNeed: ''
    });

    const [isAStudent, setIsAStudent] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);

    const [uploadedschoolResultImg, setUploadedschoolResultImg] = useState();
    const [schoolResultReaderResult, setschoolResultReaderResult] = useState();
    const [uploadedPassportImg, setUploadedPassportImg] = useState();
    const [passportPhotoReaderResult, setPassportPhotoReaderResult] = useState();

    const handleFormInput = (e) => {
        setFormInputData({
            ...formInputData,
            [e.target.name]: e.target.value
        });
    }

    const handleSelectStudentOrNot = (e) => {
        setIsAStudent(e.target.value);
    }

    const handleschoolResultUpload = (e) => {
        setUploadedschoolResultImg(e.target.files[0]);
    }

    const handlePassportUpload = (e) => {
        setUploadedPassportImg(e.target.files[0]);
    }

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);

        // make sure compulsory inputs are not empty
        if (formInputData.fullname === '' ||
            formInputData.age === '' || formInputData.state === '' ||
            formInputData.email === '' || formInputData.phone === '' ||
            formInputData.nationality === '' || formInputData.residentialAddress === '' ||
            formInputData.gender === '' || formInputData.lga === '' ||
            formInputData.village === '' || formInputData.maritalStatus === '' ||
            formInputData.disabilities === '' || formInputData.currentCondition === '' ||
            formInputData.currentNeed === '' || formInputData.occupation === '') {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all the required fields',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        if (isAStudent === '') {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please select whether you\'re a studen or not',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        if (!uploadedPassportImg) {
            setSubmitted(false);
            Swal.fire({
                title: 'Error!',
                text: 'Please upload passport photograph to continue',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return false;
        }

        if (isAStudent === "yes") {
            if (!uploadedschoolResultImg) {
                setSubmitted(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Please upload your past or immediate result to continue',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return false;
            }
        }

        // send form data as post request to the server
        (async () => {
            const rawResponse = await fetch('/api/logif-data/submit-request', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formInputData,
                    isAStudent: isAStudent,
                    passportPhoto: passportPhotoReaderResult,
                    schoolResult: schoolResultReaderResult,
                })
            });
            const content = await rawResponse.json();
            // stop the progress bar
            setSubmitted(false);
            // check if there is an error in the response
            if (content.error) {
                Swal.fire({
                    title: 'Error!',
                    text: content.message,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            } else {
                setFormInputData({
                    ...formInputData,
                    fullname: '', age: '', state: '', email: '',
                    occupation: '', nationality: '', residentialAddress: '', phone: '',
                    gender: '', lga: '', village: '', maritalStatus: '', schoolName: '',
                    schoolAddress: '', schoolLevel: '', courseOfStudy: '',
                    disabilities: '', currentCondition: '', currentNeed: ''
                });

                Swal.fire({
                    title: 'Success!',
                    text: content.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
        })();
    }

    useEffect(() => {
        if (!uploadedschoolResultImg) {
            return;
        }

        const schoolResultReader = new FileReader();
        schoolResultReader.readAsDataURL(uploadedschoolResultImg);
        schoolResultReader.onloadend = () => {
            setschoolResultReaderResult(schoolResultReader.result);
        };
        schoolResultReader.onerror = () => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong with the uploaded schoolResult',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedschoolResultImg]);

    useEffect(() => {
        if (!uploadedPassportImg) {
            return;
        }

        const passportPhotoReader = new FileReader();
        passportPhotoReader.readAsDataURL(uploadedPassportImg);
        passportPhotoReader.onloadend = () => {
            setPassportPhotoReaderResult(passportPhotoReader.result);
        };
        passportPhotoReader.onerror = () => {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong with the uploaded passport photo',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadedPassportImg]);

    useEffect(() => {
        // start up backend server
        fetch('/api/startup');
    }, []);

    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center bg-gray-100">
                <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                    <h3 className="text-xl font-bold text-center">LOGIF FORM</h3>
                    <div>
                        <div
                            className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
                            <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                                                rounded-md font-semibold text-xs tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                                                focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="passportImage">

                                Select a passport photograph
                            </label>
                            <input id="passportImage" onChange={handlePassportUpload} className="text-sm cursor-pointer w-36 hidden" type="file" />

                        </div>
                        <div
                            className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                            {
                                uploadedPassportImg ?
                                    <img className="w-16 h-24 md:w-32 md:h-40" src={URL.createObjectURL(uploadedPassportImg)} alt="Uploaded passport" /> :
                                    <span className="text-gray-400 opacity-75">
                                        <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </span>
                            }

                        </div>
                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Full Names</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['fullname']} name="fullname" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Age</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['age']} name="age" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Age" />
                                </div>
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Marital Status</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['maritalStatus']} name="maritalStatus" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Village</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['village']} name="village" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">LGA/District</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['lga']} name="lga" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Nationality</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['nationality']} name="nationality" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">State/Province</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['state']} name="state" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Occupation</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['occupation']} name="occupation" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                            <div className="w-1/2 px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Gender</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                    <select onChange={handleFormInput} name="gender" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Telephone Number/Fax</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['phone']} name="phone" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Email</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['email']} name="email" type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">Residential Address</label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['residentialAddress']} name="residentialAddress" type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">
                                    Are you a student
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <select onChange={handleSelectStudentOrNot} name="prayerType" data-te-select-init>
                                        <option value="">Select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {
                            (isAStudent === 'yes') ?
                                <>
                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label for="" className="text-xs font-semibold px-1">
                                                Name of your school
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <input onChange={handleFormInput} value={formInputData['schoolName']} name="schoolName" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label for="" className="text-xs font-semibold px-1">
                                                Physical address of your school
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <textarea
                                                    onChange={handleFormInput} value={formInputData['schoolAddress']}
                                                    name="schoolAddress"
                                                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                                    rows="3">
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label for="" className="text-xs font-semibold px-1">
                                                Class/Grade/Year
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <input onChange={handleFormInput} value={formInputData['schoolLevel']} name="schoolLevel" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label for="" className="text-xs font-semibold px-1">
                                                Course of study (for university students)
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <input onChange={handleFormInput} value={formInputData['courseOfStudy']} name="courseOfStudy" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex -mx-3">
                                        <div className="w-full px-3 mb-5">
                                            <label for="" className="text-xs font-semibold px-1">
                                                Your past immediate result
                                            </label>
                                            <div className="flex">
                                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                                <div
                                                    className="rounded-l-lg p-4 bg-gray-200 flex flex-col justify-center items-center border-0 border-r border-gray-300 ">
                                                    <label className="cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-2 py-2 bg-gray-900 text-gray-50 border border-transparent
                                            rounded-md font-semibold text-xs tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none 
                                            focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150" htmlFor="schoolResultImage">

                                                        Upload Result
                                                    </label>
                                                    <input id="schoolResultImage" onChange={handleschoolResultUpload} className="text-sm cursor-pointer w-36 hidden" type="file" />

                                                </div>
                                                <div
                                                    className="relative order-first md:order-last h-28 md:h-auto flex justify-center items-center border border-dashed border-gray-400 col-span-2 m-2 rounded-lg bg-no-repeat bg-center bg-origin-padding bg-cover">
                                                    {
                                                        uploadedschoolResultImg ?
                                                            <img className="w-16 h-24 md:w-32 md:h-40" src={URL.createObjectURL(uploadedschoolResultImg)} alt="Uploaded schoolResult" /> :
                                                            <span className="text-gray-400 opacity-75">
                                                                <svg className="w-14 h-14" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="0.7" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                </svg>
                                                            </span>
                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </> : ''
                        }

                        <div className="flex mt-2 -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">
                                    Disabilities (None/State your disabilities)
                                </label>
                                <br />
                                <label for="" className="text-xs text-red-600 font-semibold px-1">
                                    For disabled person, make a short clip video of your abilities and
                                    disabilities and send to the email address below
                                </label>
                                <br />
                                <label for="" className="text-xs text-primary font-semibold px-1">
                                    logif.org@gmail.com
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <input onChange={handleFormInput} value={formInputData['disabilities']} name="disabilities" type="text" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">
                                    Your current condition
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <textarea
                                        onChange={handleFormInput} value={formInputData['currentCondition']}
                                        name="currentCondition"
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                        rows="3">
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <label for="" className="text-xs font-semibold px-1">
                                    Your current need
                                </label>
                                <div className="flex">
                                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                    <textarea
                                        onChange={handleFormInput} value={formInputData['currentNeed']}
                                        name="currentNeed"
                                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                                        rows="3">
                                    </textarea>
                                </div>
                            </div>
                        </div>

                        <label for="" className="text-xs font-semibold px-1">
                            Please note that the information provided must be genuine and not fake.
                            Any false details given will result in disqualification of the
                            person providing such inaccurate information.
                        </label>
                        <br />
                        <label for="" className="text-xs font-semibold px-1 mb-2">
                            Please send a video clip to LOGIF at logif.org@gmail.com,
                            including all the information that you have captured in the form above.
                        </label>

                        {
                            // show the progress bar if data is submited and being processed
                            (submitted) ? (
                                <div className="bg-gray-900">
                                    <ProgressBar />
                                </div>
                            ) : ""
                        }

                        <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                                <button onClick={handleSubmit} className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">SEND NOW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LogifForm;