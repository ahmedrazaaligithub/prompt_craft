"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "./Button";
import { signIn, signOut, getProviders, useSession } from "next-auth/react";
const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [togglDropdown, setTogglDropdown] = useState(false);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("response", response);
      setProviders(response);
    };
    setUpProviders();
  }, []);
  const changeTogle = () => {
    setTogglDropdown((prev) => !prev);
  };

  return (
    <nav className="flex-between  w-full mb-16 pt-3 ">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promt Craft Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Prompt Craft</p>
      </Link>
      {/* desktop navigation */}
      <div className="sm:flex hidden">
        {session?.user ?(
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              {" "}
              Create Post{console.log(session?.user)}
            </Link>
            <Button className={"outline_btn"} onClick={() =>signOut()}>Sign Out</Button>
            <Link href={"/Profile"}>
              <Image
                src={session?.user?.image}
                height={37}
                width={37}
                className="rounded-full"
                alt="profile"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <Button
                    className={"black_btn"}
                    onClick={async() => {
                      const userSignedIn = await signIn(provider.id)
                      console.log('userSignedIn-->' , userSignedIn)
                    }}
                    type={provider.name}
                  >
                    Sign In
                  </Button>
                );
              })}
          </>
        )}
      </div>
      {/* mobile navigation */}
      <div className="flex sm:hidden relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}

              alt="Profile"
              width={37}
              height={37}
              className="rounded-full"
              onClick={changeTogle}
            />
            {togglDropdown && (
              <div className="dropdown">
                <Link
                  href={"/Profile"}
                  onClick={() => setTogglDropdown(false)}
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  onClick={() => setTogglDropdown(false)}
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>
                <Button
                  onClick={() => {
                    setTogglDropdown(false);
                    signOut();
                  }}
                  className={"mt-5 w-full black_btn"}
                >
                  SignOut
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => {
                return (
                  <Button
                    className={"black_btn"}
                    onClick={() => signIn(provider.id)}
                    type={provider.name}
                  >
                    Sign In
                  </Button>
                );
              })}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
