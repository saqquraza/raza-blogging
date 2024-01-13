"use client"
import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";

function LogIn() {
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
        await signInWithEmailAndPassword(auth, userAuth.email, userAuth.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                router.push("/")
                // ...
            })
            .catch((error: any) => {
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
                <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                    <input
                        type='email'
                        placeholder='Enter User Email'
                        className='bg-slate-100 p-2 rounded-lg '
                        value={userAuth.email}
                        onChange={(e) => { setUserAuth({ ...userAuth, email: e.target.value }) }}
                    />
                    <input
                        type='password'
                        placeholder='Enter User Password'
                        className='bg-slate-100 p-2 rounded-lg '
                        value={userAuth.password}
                        onChange={(e) => { setUserAuth({ ...userAuth, password: e.target.value }) }}
                    />
                    <button className='bg-slate-600 text-white p-3 rounded-lg uppercase font-semibold hover:opacity-95 disabled:opacity-80' type="submit" disabled={loading} >{loading ? 'loading..' : 'Log In'} </button>
                    <p className='text-red-500 text-center text-lg'>{respMessage}</p>
                </form>
                <div className='flex gap-2 mt-5'>
                    <p>Dont Have an account?</p>
                    <Link href={'/sign-up'}>
                        <span className='text-blue-500'>Sign up</span>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default LogIn