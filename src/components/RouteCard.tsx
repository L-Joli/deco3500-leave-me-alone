import { QRCodeSVG } from "qrcode.react";

interface RouteCardProps {
  label: string;
  path: string;
}

export function RouteCard({ label, path }: RouteCardProps) {
  const url = `${window.location.origin}${path}`;
  return (
    <article className="route-card">
      <a className="route-card__main" href={path}>
        <span>{label}</span>
        <code>{path}</code>
      </a>
      <a
        className="route-card__qr"
        href={path}
        aria-label={`Open ${label}`}
        title={url}
      >
        <QRCodeSVG
          value={url}
          size={84}
          bgColor="#ffffff"
          fgColor="#17233d"
          level="M"
          marginSize={2}
        />
      </a>
    </article>
  );
}
