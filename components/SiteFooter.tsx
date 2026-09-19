import Link from "next/link";

const GRASS_BLADE_COUNT = 100;

export function SiteFooter() {
  return (
    <>
      <div className="grass-footer" aria-hidden="true" />
      <div className="grass-container" aria-hidden="true">
        {Array.from({ length: GRASS_BLADE_COUNT }, (_, i) => (
          <div key={i} className="grass-blade" />
        ))}
      </div>
      <Link href="/privacy-policy" className="privacy-chip" title="View our Privacy Policy">
        By using this website, you are agreeing to our <em>Privacy Policy</em>.
      </Link>
    </>
  );
}
