import React, { useState } from "react";
import Homepage from "../components/Homepage";
import Heading from "../components/Heading";

export default function Home() {
  return (
    <div>
      <Heading />
      <main>
        <Homepage />
      </main>
    </div>
  );
}
