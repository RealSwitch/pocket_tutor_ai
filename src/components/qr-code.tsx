import * as React from 'react';

// This is a simplified, static SVG representation of a QR code for visual purposes.
// It does not encode the actual `value` prop.
export function QrCode({ value, className }: { value: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 33 33"
      className={`w-48 h-48 shape-rendering-crispedges ${className}`}
      aria-label={`QR Code for ${value}`}
      role="img"
    >
      <path
        fill="#000"
        d="M0 0h7v7H0z M1 1h5v5H1z m2 2h1v1H3z M0 26h7v7H0z M1 27h5v5H1z m2 2h1v1H3z M26 0h7v7h-7z M27 1h5v5h-5z m2 2h1v1h-2z M9 0h1v1H9z m2 0h1v1h-1z m2 0h1v1h-1z m2 0h1v1h-1z m2 0h1v1h-1z m-1 2h1v1h-1z m2 0h1v1h-1z m-5 1h1v1H9z m1-2h1v1h-1z m-1 2h1v1H9z m1-1h1v1h-1z m1-1h1v1h-1z m1-1h1v1h-1z m1 0h1v1h-1z m1 0h1v1h-1z m1 0h1v1h-1z M9 4h1v1H9z m1 0h1v1h-1z m2 0h1v1h-1z m1 0h1v1h-1z m-1 1h1v1h-1z m-3-1h1v1H9z m1 1h1v1h-1z m-1-2h1v1H9z m2 1h1v1h-1z m-2 2h1v1H9z m1-1h1v1h-1z m0 2h1v1h-1z m1 0h1v1h-1z M9 9h1v1H9z m0 2h1v1H9z m0 2h1v1H9z m0 2h1v1H9z m0 2h1v1H9z M31 9h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m-1 0h1v1h-1z m0 2h1v1h-1z m0 2h1v1h-1z m0 2h1v1h-1z m0 2h1v1h-1z m0 2h1v1h-1z M11 11h1v1h-1z m1 1h1v1h-1z m-2 1h1v1h-1z m0-2h1v1h-1z m1-1h1v1h-1z m2 2h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m-4-4h1v1h-1z m1-1h1v1h-1z m-2 1h1v1h-1z m1-1h1v1h-1z m-2 0h1v1h-1z m-1 1h1v1h-1z M26 11h1v1h-1z m1 0h1v1h-1z m2 0h1v1h-1z m-2 2h1v1h-1z m-1-1h1v1h-1z m-1 2h1v1h-1z m-1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m-1 1h1v1h-1z m-1 1h1v1h-1z m-1 1h1v1h-1z M9 26h1v1H9z m2 0h1v1h-1z m2 0h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m-4 1h1v1h-1z m-1-2h1v1H9z m1 1h1v1h-1z m0 2h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m-1-2h1v1h-1z m-1-1h1v1h-1z m2 2h1v1h-1z m1 1h1v1h-1z m1-3h1v1h-1z M31 26h1v1h-1z m-2 0h1v1h-1z m-2 0h1v1h-1z m-2 0h1v1h-1z m-2 0h1v1h-1z m-2 0h1v1h-1z m-2 0h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z m1 1h1v1h-1z"
      />
    </svg>
  );
}
