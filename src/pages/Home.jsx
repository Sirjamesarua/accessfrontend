import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axiosClient from '../interceptors/axios-client';
import { useLoaderData } from 'react-router-dom';

export async function loader() {
    const { data } = await axiosClient.get("/get");
    const emailCount = data;
    console.log(emailCount);
    return { emailCount };
}

export default function Home() {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();
    const [result, setResult] = useState(null);

    const { emailCount } = useLoaderData();

    const onSubmit = async (data) => {
        console.log(data);
        // return;
        await axiosClient.post(`/submit_email`, data)
            .then((data) => {
                console.log(data.data);
                setResult(data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            <div className="container mt-5">
                <h1 className=''>
                    Dashboard
                </h1>
                <div className="p-2 bg-body-tertiary border">
                    Total emails: {emailCount.totalEmails}
                </div>
                <hr />

                <div className=''>
                    <p><span className="text-danger fw-bold me-1">*</span>
                        Emails must be separeted my commas ","
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <textarea id="data" cols="30" rows="10" placeholder='first@mail.com, second@mail.com'
                                className='form-control shadow-sm border border-dark rounded-0 fst-italic fw-semibold'
                                {...register('email')}
                            ></textarea>
                        </div>
                        <button className="btn btn-dark rounded-0 w-100 text-uppercase">
                            {isSubmitting ? (<span className="loading-text">Verifying...</span>) : "Verify"}
                        </button>
                    </form>

                    {result &&
                        <div className="border rounded p-3 bg-body-secondary">
                            <h2 className='fs-6'>
                                Duplicate emails
                            </h2>
                            <ol>
                                {result.duplicateEmails.length > 0 ? result.duplicateEmails.map((email, index) =>
                                    <li key={index}>{email}, </li>
                                ) : 'no duplicate emails'}
                            </ol>

                            <h2 className='fs-6'>
                                Unverified emails
                            </h2>
                            <ol>
                                {result.notVerified.length > 0 ? result.notVerified.map((email, index) =>
                                    <li key={index}>{email}, </li>
                                ) : 'no verified emails'}
                            </ol>

                            <h2 className='fs-6'>
                                Verified emails: {result.verifiedEmails.length}
                            </h2>
                        </div>
                    }

                </div >
            </div >
        </>
    )
}