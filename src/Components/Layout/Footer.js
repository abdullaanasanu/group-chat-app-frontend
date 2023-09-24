import React from "react";

export default function Footer() {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()}{" "}
        Chat App
      </p>
    </footer>
  );
}
