type ReasonIconProps = {
  name: string;
};

export function ReasonIcon({ name }: ReasonIconProps) {
  switch (name) {
    case "home":
      return (
        <svg viewBox="0 0 44 44" aria-hidden>
          <path d="M6 36V16l16-10 16 10v20zM17 36V24h10v12" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 44 44" aria-hidden>
          <circle cx="22" cy="22" r="15" />
          <path d="M22 12v10l7 5" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 44 44" aria-hidden>
          <path d="M8 34l8-18 6 10 5-7 9 15z" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 44 44" aria-hidden>
          <path d="M22 6l4 11h11l-9 7 3 12-9-7-9 7 3-12-9-7h11z" />
        </svg>
      );
    default:
      return null;
  }
}