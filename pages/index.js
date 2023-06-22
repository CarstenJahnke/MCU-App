import React, { useState } from "react";
import Homepage from "../components/Homepage";
import HeadingContainer from "../components/HeadingContainer";

export default function Home() {
  return (
    <div>
      <HeadingContainer />
      <main>
        <Homepage />
      </main>
    </div>
  );
}
