"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const navbar = () => {
    const { data: session } = useSession()
    const [providers, setProviders] = useState(null)
    const [toggleDropDown, setToggleDropDown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders()
            setProviders(response)
        }
        setUpProviders()
    }, [])
    return (
        <nav className="flex justify-between w-full mb-16">
            <Link href="/" className="flex gap-2 flex-center">
                <Image src={"/assets/images/logo.svg"} width={32} height={32} ></Image>
                <p className="logo_text">Promptia</p>
            </Link>
            <div className="sm:flex hidden">
                {session?.user ? (
                    <div className="flex gap-3 mt-4">
                        <Link href="/create-prompt" className="black_btn">Create Post</Link>
                        <button type="button" onClick={signOut} className="outline_btn">Sign Out</button>
                        <Link href="/post">
                            <Image src={session?.user.image} width={32} height={32} className="rounded-full"></Image>
                        </Link>
                    </div>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button" onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
                            ))
                        }
                    </div>
                )}

            </div>
            {/*Mobile Nav*/}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div>
                        <Image src={session?.user.image}
                            width={32}
                            height={32}
                            className="rounded-full"
                            onClick={() => setToggleDropDown((prev) => !prev)}>
                        </Image>
                        {toggleDropDown && (
                            <div className="dropdown">
                                <Link href="/profile"
                                    className="mt-4 w-full black_btn"
                                    onClick={() => setToggleDropDown((prev) => !prev)}>
                                    Profile
                                </Link>
                                <Link href="/create-prompt"
                                    className="mt-4 w-full black_btn"
                                    onClick={() => setToggleDropDown((prev) => !prev)}>
                                    Create Post
                                </Link>
                                <button type="button"
                                    className='mt-4 w-full black_btn'
                                    onClick={() => {
                                        signOut()
                                        setToggleDropDown()
                                    }}
                                >
                                    Sign out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button type="button" onClick={() => signIn(provider.id)} className="black_btn">Sign In</button>
                            ))
                        }
                    </div>
                )}
            </div>
        </nav>
    )
}

export default navbar