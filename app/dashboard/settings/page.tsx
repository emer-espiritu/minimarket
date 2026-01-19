"use client";

import { useState } from "react";
import Pagination from "@/components/pagination/Pagination";

const Settings = () => {
  const [current, setCurrent] = useState(1);
  const totalPages = 5;

  return (
    <div style={{ padding: "2rem" }}>
      <Pagination
        currentPage={current}
        totalPages={totalPages}
        //onPageChange={handleOnClick}
      />
    </div>
  );
};

export default Settings;
