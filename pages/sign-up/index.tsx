"use client"

import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SignUp() {
    const [userAuth, setUserAuth] = useState<any>({
        email: "",
        password: ""
    })
    const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [respMessage, setRespMessage] = useState();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        await createUserWithEmailAndPassword(auth, userAuth.email, userAuth.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                router.push("/")
                // ...
            })
            .catch((error:any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setLoading(false)
                setRespMessage(errorMessage)
                // ..
            });

    }

    return (
        <>
            <div className='max-w-md mx-auto p-3'>
                <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input type='email' id='email' placeholder='Enter User Email' className='bg-slate-100 p-2 rounded-lg ' value={userAuth.email}
                        onChange={(e) => { setUserAuth({ ...userAuth, email: e.target.value }) }} />
                    <input type='password' id='password' placeholder='Enter User Password' className='bg-slate-100 p-2 rounded-lg ' value={userAuth.password}
                        onChange={(e) => { setUserAuth({ ...userAuth, password: e.target.value }) }} />
                    <button  disabled={loading} className='bg-slate-600 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-80' type="submit">{loading ? 'loading..' : 'Sign Up'}</button>
                    <p className='text-red-500 text-center text-lg'>{respMessage}</p>
                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Have an account?</p>
                    <Link href={'/login'}>
                        <span className='text-blue-500'>Sign in</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SignUp