import React, { useState } from 'react'
import { useFormik } from 'formik'
import { ISignupBody } from '../utils/types'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'
import { useAppDispatch } from '../redux/hooks'
import { signup } from '../redux/slices/userSlice'
import { GetServerSideProps } from 'next'
import { decodeToken } from '../utils/generate'
import { decode } from 'jsonwebtoken'

const SignupPage = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const initialValues: ISignupBody = {
        name: ''
    }

    const { values, handleChange, handleSubmit, errors, setErrors } = useFormik<ISignupBody>({ initialValues, onSubmit })

    async function onSubmit(values: ISignupBody) {
        try {
            setLoading(true)
            const { data } = await axios.post('/users', values)
            if (data.status === 'success') {
                const token = data.data.token
                cookie.set('goodjobKids', token, { secure: true, sameSite: "strict", path: "/" })
                router.push('/')
            }
            setLoading(false)
            return
        } catch (error: any) {
            setErrors(error?.response?.data?.errors)
            setLoading(false)
        }
    }

    return (
        <div className="container h-screen shadow-md absolute inset-0 bg-blue-200 flex justify-center items-center">
            <div className="text-center w-full flex flex-col justify-center items-center">
                <p className="text-2xl tracking-wider text-green-600">Enter your name</p>
                <form className="mt-2 w-full flex flex-col items-center" onSubmit={handleSubmit} noValidate>
                    <input autoComplete="off" autoFocus type="text" className="block w-3/4 rounded-2xl shadow-sm focus:border-0 focus:ring-green-600 focus:ring-2 h-[42px] tracking-wider text-center" name="name" value={values.name} onChange={handleChange} />
                    {errors && errors.name && <p className="text-red-500 mt-2">{errors.name}</p>}
                    <button className="py-1 px-7 rounded-xl border shadow-md bg-green-600 text-gray-50 text-lg tracking-wider mt-4 flex items-center" type="submit" disabled={loading}>
                        {loading && <ReactLoading type='spinningBubbles' height={20} width={20} />}
                        <span className="ml-3">Submit</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.goodjobKids
    const user = decodeToken(token)
    if (user) {
        return { redirect: { destination: '/', permanent: false } };
    }
    return {
        props: {}
    }
}