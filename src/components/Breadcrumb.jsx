import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ currentPage, parentPage, parentLink = "/shop" }) => {
  return (
    <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-10">
      <div className="pt-7 text-[11px] tracking-wide text-[#6d6258]">

        {/* Home */}
        <Link
          to="/"
          className="transition-colors duration-300 hover:text-[#9b6b2f]"
        >
          Home
        </Link>

        {/* Parent Page - don't show Home again */}
        {parentPage && parentPage !== "Home" && (
          <>
            <span className="mx-2 text-[#b79a72]">/</span>

            <Link
              to={parentLink}
              className="transition-colors duration-300 hover:text-[#9b6b2f]"
            >
              {parentPage}
            </Link>
          </>
        )}

        {/* Current Page */}
        <span className="mx-2 text-[#b79a72]">/</span>

        <span className="text-[#211a14]">
          {currentPage}
        </span>

      </div>
    </div>
  );
};

export default Breadcrumb;