import React from "react";

export default function Filter({ setModalShow }) {
  return (
    <svg
      onClick={() => setModalShow(true)}
      style={{ width: 20, height: 22 }}
      width="28"
      height="30"
      viewBox="0 0 28 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 15C10 14.31 10.5612 13.75 11.25 13.75C11.9388 13.75 12.5 14.31 12.5 15C12.5 15.69 11.9388 16.25 11.25 16.25C10.5612 16.25 10 15.69 10 15ZM7.5 15C7.5 17.0712 9.17875 18.75 11.25 18.75C13.3212 18.75 15 17.0712 15 15C15 12.9288 13.3212 11.25 11.25 11.25C9.17875 11.25 7.5 12.9288 7.5 15ZM12.5 26.25C12.5 28.3212 14.1788 30 16.25 30C18.3212 30 20 28.3212 20 26.25C20 24.1788 18.3212 22.5 16.25 22.5C14.1788 22.5 12.5 24.1788 12.5 26.25ZM12.5 3.75C12.5 5.82125 14.1788 7.5 16.25 7.5C18.3212 7.5 20 5.82125 20 3.75C20 1.67875 18.3212 0 16.25 0C14.1788 0 12.5 1.67875 12.5 3.75ZM5 15C5 14.5712 5.04375 14.1538 5.12625 13.75H1.25C0.56 13.75 0 14.3088 0 15C0 15.6912 0.56 16.25 1.25 16.25H5.12625C5.04375 15.8462 5 15.4288 5 15ZM10 3.75C10 3.32125 10.0437 2.90375 10.1262 2.5H1.25C0.56 2.5 0 3.05875 0 3.75C0 4.44125 0.56 5 1.25 5H10.1262C10.0437 4.59625 10 4.17875 10 3.75ZM22.5 3.75C22.5 4.17875 22.4563 4.59625 22.3738 5H26.25C26.94 5 27.5 4.44125 27.5 3.75C27.5 3.05875 26.94 2.5 26.25 2.5H22.3738C22.4563 2.90375 22.5 3.32125 22.5 3.75ZM10 26.25C10 25.8212 10.0437 25.4037 10.1262 25H1.25C0.56 25 0 25.5588 0 26.25C0 26.9412 0.56 27.5 1.25 27.5H10.1262C10.0437 27.0963 10 26.6788 10 26.25ZM17.5 15C17.5 15.4288 17.4563 15.8462 17.3738 16.25H26.25C26.94 16.25 27.5 15.6912 27.5 15C27.5 14.3088 26.94 13.75 26.25 13.75H17.3738C17.4563 14.1538 17.5 14.5712 17.5 15ZM22.5 26.25C22.5 26.6788 22.4563 27.0963 22.3738 27.5H26.25C26.94 27.5 27.5 26.9412 27.5 26.25C27.5 25.5588 26.94 25 26.25 25H22.3738C22.4563 25.4037 22.5 25.8212 22.5 26.25Z"
        fill="black"
      />
    </svg>
  );
}
