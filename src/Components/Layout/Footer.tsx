import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>
        © {new Date().getFullYear()}{" "}
        Chat App
      </p>
    </footer>
  );
}

export default Footer;