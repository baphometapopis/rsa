import React, { useCallback, useEffect, useState } from "react";
import BrandLogo from "../assets/img/brandLogo.png";

import { useNavigate } from "react-router-dom";

export default function Footer({ toggle }) {
  return (
    <>
      <footer className="fixed   z-10 bg-black flex justify-center items-center align-middle md:sticky bottom-0 w-full  h-12 px-6 border-b border-neutral-light">
        <p style={{ color: "white", fontSize: "0.8rem", textAlign: "center" }}>
          Copyright © 2024 Myassistancenow | Powered by Indicosmic | All Rights
          Reserved
        </p>
      </footer>
    </>
  );
}
