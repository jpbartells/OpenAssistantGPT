"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/card-skeleton-auth";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true); // Start loading
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false); // Stop loading
      console.log(result , 'result')
    } else {
        router.push("/dashboard");
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      {isLoading ? (
      <SkeletonCard /> 
        ) : (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.bot className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
          <p className="text-md text-muted-foreground">Sign in with your email and password.</p>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
     
        <form onSubmit={handleSubmit} className="flex flex-col space-y-10">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            className={cn(
              "px-8",
              "h-12"
            )}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={cn(
              "px-8",
              "h-12"
            )}
          />
          <button type="submit" className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "px-6",
                 "border-black",
                "text-black", // White text for contrast
                "hover:text-gray-200", // Slightly lighter text on hover
                "hover:bg-gray-800", // Dark gray background on hover
                "active:text-gray-400", // Even lighter text on active state
                "bg-gray-200" // Almost black background on active state
              )} >Sign In</button>
        </form>
        




        <p className="text-md text-muted-foreground">
        By registering, you agree to our <a 
         className="text-gray-500"  href="/docs/legal/terms">Terms of Service</a> and <a   className="text-gray-500"  href="/docs/legal/privacy">Privacy Policy</a>.
        </p>


        <hr></hr>
              <p className="text-md text-muted-foreground">Don’t have an account?  <a 
        className="text-gray-500" href="/signup">Register</a> </p>

<hr></hr>
      </div>
        )}
    </div>
  );
}
