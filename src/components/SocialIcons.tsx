type SocialIconProps = {
  network: string;
};

export function SocialIcon({ network }: SocialIconProps) {
  if (network === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return null;
}