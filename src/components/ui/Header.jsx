import React, { useCallback, useEffect, useState } from "react";
import BrandLogo from "../../assets/img/brandLogo.png";

import { useNavigate } from "react-router-dom";

export default function Header({ toggle }) {
  return (
    <>
      <header className="fixed  z-10 bg-white flex justify-between items-center md:sticky top-0 w-full h-12 px-6 border-b border-neutral-light">
        <div className="flex">
          <img
            src={"https://www.tvsservice.com/assets/images/tvs.png"}
            alt="tvs-brand-logo"
            className="w-32"
          />
        </div>
      </header>
    </>
  );
}
