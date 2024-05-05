import React from "react"

interface sendIconProps {
  className?: string
  size?: number
}

export const SendIcon: React.FC<sendIconProps> = ({ size, className }) => {
  return (
    <div className={className} style={{ width: size ?? "24px", height: size ?? "24px" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={size ?? "24px"}
        width={size ?? "24px"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z"></path>
      </svg>
    </div>
  )
}

export const CloseIcon: React.FC<sendIconProps> = ({ size, className }) => {
  return (
    <div className={className} style={{ width: size ?? "24px", height: size ?? "24px" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 352 512"
        height={size ?? "24px"}
        width={size ?? "24px"}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Close icon path */}
        <path d="M220.686 256l125.657-125.657c4.686-4.686 4.686-12.284 0-16.971l-22.628-22.627c-4.686-4.686-12.284-4.686-16.971 0L176 216.686 50.343 91.029c-4.686-4.686-12.284-4.686-16.971 0l-22.628 22.627c-4.686 4.686-4.686 12.284 0 16.971L131.314 256 5.657 381.657c-4.686 4.686-4.686 12.284 0 16.971l22.628 22.627c4.686 4.686 12.284 4.686 16.971 0L176 295.314l125.657 125.657c4.686 4.686 12.284 4.686 16.971 0l22.628-22.627c4.686-4.686 4.686-12.284 0-16.971L220.686 256z" />
      </svg>
    </div>
  )
}

export const ArrowIcon: React.FC<sendIconProps> = ({ size, className }) => {
  return (
    <div className={className} style={{ width: size ?? "24px", height: size ?? "24px" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 448 512"
        height={size ?? "24px"}
        width={size ?? "24px"}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arrow icon path */}
        <path d="M256 217.9L383 345c9.4 9.4 24.6 9.4 33.9 0 9.4-9.4 9.3-24.6 0-34L273 167c-9.1-9.1-23.7-9.3-33.1-.7L95 310.9c-4.7 4.7-7 10.9-7 17s2.3 12.3 7 17c9.4 9.4 24.6 9.4 33.9 0l127.1-127z" />
      </svg>
    </div>
  )
}

export const ErrorIcon: React.FC<sendIconProps> = ({ size }) => {
  return (
    <div style={{ width: size ?? "24px", height: size ?? "24px" }}>
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 32 32"
        height={size ?? "24px"}
        width={size ?? "24px"}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Error icon path */}
        <g id="Error">
          <circle cx="16" cy="16" id="BG" r="16" style={{ fill: "red" }} />
          <path d="M14.5,25h3v-3h-3V25z M14.5,6v13h3V6H14.5z" id="Exclamatory_x5F_Sign" style={{ fill: "#fff" }} />
        </g>
      </svg>
    </div>
  )
}
