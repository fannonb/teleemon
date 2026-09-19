import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

type Props = {
  bg?: "home" | "our-team" | "services" | "treatments" | "resources" | "privacy" | "appointment";
  children: React.ReactNode;
};

export function SiteShell({ bg = "home", children }: Props) {
  return (
    <div className="teleemon-shell" data-bg={bg}>
      <div className="shell-scroll">
        <SiteHeader />
        <main className="main-body">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
