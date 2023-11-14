"use client"
import { useQRCode } from "next-qrcode";
import React from "react";

const QR = () => {
  const { Image :Im } = useQRCode();
  return (
    <Im
      text={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/entry/65538c531f1d1d8f8a4fe0c9`}
      options={{
        type: "image/jpeg",
        quality: 0.3,
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: 200,
        color: {
          dark: "#010599FF",
          light: "#FFBF60FF",
        },
      }}
    />
  );
};

export default QR;
