import React from 'react'
import axiosClient from '../interceptors/axios-client'
import { useStateContext } from '../context/ContextProvider'
import { useForm } from 'react-hook-form';

export default function Login() {
    const { putToken } = useStateContext();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        await axiosClient.post('/login', data)
            .then(({ data }) => {
                putToken(data.access_token);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <>
            <div className='container mt-5 w-32'>
                <header className='mb-4 pt-5'>
                    <h1>Welcome</h1>
                    <p className='text-primary'>LOGIN</p>
                </header>

                <hr />

                <main>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-3'>
                            <label htmlFor="email" className='text-secondary'>Email</label>
                            <input type="email" id='email' placeholder='john@email.com'
                                className='form-control py-2 rounded-0 shadow-sm border border-dark'
                                {...register('email')} required
                            />
                        </div>

                        <div className='mb-4'>
                            <label htmlFor="password" className='text-secondary'>Password</label>
                            <input type="password" id='password' placeholder="**********"
                                className='form-control py-2 rounded-0 shadow-sm border border-dark'
                                {...register('password')} required
                            />
                        </div>

                        <div className='mt-5'>
                            <button className="btn btn-dark w-100 rounded-0 text-uppercase" disabled={isSubmitting}>
                                {isSubmitting ? (<span className="loading-text">processing</span>) : "login"}
                            </button>
                        </div>

                    </form>
                </main>
            </div>
        </>
    )
}
