"use client";

import { BeatLoader } from "react-spinners";
import { CardWrapper } from "@/components/auth/card-wrapper";

import { confirmVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { StrictMode } from "react";

import { FormErrorMessage } from "../form-error";
import { FormSuccessMessage } from "../form-success";

const NewVerificationForm = () => {
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      confirmVerification(token).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    } else {
      setError("Invalid token");
    }
  }, [token]);

  return (
    <CardWrapper
      backButtonHref="/auth/login"
      headerLabel="Confirming your verification code"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader />}
        <FormErrorMessage message={error} />
        <FormSuccessMessage message={success} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
