"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  isAppPrivate?: boolean;
  isFromRegisterAdmin?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  isAppPrivate,
  isFromRegisterAdmin
}: CardWrapperProps) => {

  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && 
      <CardFooter>
        <Social />  
      </CardFooter>}
      <CardFooter>
        {!isAppPrivate && !isFromRegisterAdmin &&
        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
        ></BackButton>}
        
          {isAppPrivate && !isFromRegisterAdmin && <>
          <p className="text-xs text-center">
            <span className="">{backButtonLabel} </span>
            <a
              href="mailto:organization@gmail.com"
              className="text-blue-500 hover:text-blue-600"
            >
              Contact us
            </a>
            </p>
          </>}

      </CardFooter>
    </Card>
  );
};
