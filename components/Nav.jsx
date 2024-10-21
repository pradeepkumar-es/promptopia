"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useState, useEffect} from 'react';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
/*
In Next.js, getProviders is a function provided by the next-auth library that allows you
 to retrieve the list of authentication providers configured for your application.
getProviders fetches the configuration details for all the authentication providers
 you've set up in your NextAuth configuration file ([...nextauth].js). This includes
 providers like Google, Facebook, GitHub, Email, and any custom providers you might have.
 */
const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)
  // useEffect(()=>{
  //   const setProviders = async ()=>{
  //     const response = await getProviders();  
  //     setProviders(response);
  //   }
  //   setProviders();
  // }, [] )
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
      <Image 
      src="/assets/images/logo.svg"
      width={30}
      height={30}
      className='object-contain'
      alt="Promptopia Logo"
      />
      <p className='logo_text'>Promtopia</p>
      </Link>
      {/*Desktop Navigation */}
      <div className='sm:flex hidden'> {/*on small device it is hidden but in usual (larger than it )it is flex */}
        {isUserLoggedIn? <div className='flex gap-3 md:gap-5'>
          <Link href="/create-prompt" className='black_btn'>Create Post</Link>
          <button type="button" onClick={signOut} className='outline_btn'>
            Sign Out
          </button>
          <Link href="/profile">
          <Image
          src="/assets/images/logo.svg"
          width={37}
          height={37}
          className='rounded-full'
          alt="profile"
          />
          </Link>
        </div> 
          : <>
          {
            providers && 
            Object.values(providers).map((provider)=>{
              <button
              type='button'
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className='black_btn'
              >
                Sign In
              </button>
            })
          }
          </>}
      </div>
      {/*Mobile Navigation*/}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn?(
          <div className='flex'>
            <Image
          src="/assets/images/logo.svg"
          width={37}
          height={37}
          className='rounded-full'
          alt="profile"
          onClick={()=>setToggleDropdown((prev)=>!prev)} //callback function inside setToggleDropdown to avoid unexpected behavior due directly changing state
          />
          {toggleDropdown && (
            <div className='dropdown'>
              <Link
              href="/profile"
              className='dropdown_link'
              onClick={()=>setToggleDropdown(false)}
              >
              My Profile
              </Link>
              <Link
              href="/create-prompt"
              className='dropdown_link'
              onClick={()=>setToggleDropdown(false)}
              >
              Create Prompt
              </Link>
              <button
              type='button'
              onClick={()=>{
                setToggleDropdown(false)
                signOut();
              }}
              className='mt-5 w-full black_btn'
              >Sign Out
              </button>
            </div>
          )}
          </div>
        )
        :(
          <>
          {
            providers && 
            Object.values(providers).map((provider)=>{
              <button
              type='button'
              key={provider.name}
              onClick={()=>signIn(provider.id)}
              className='black_btn'
              >
                Sign In
              </button>
            })
          }
          </>
        )
        }
      </div>
    </nav>
  )
}

export default Nav
