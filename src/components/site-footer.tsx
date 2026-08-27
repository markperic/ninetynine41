import Image from "next/image";
import { FacebookIcon, InstagramIcon } from "@/components/social-icons";
import { ScrollReveal } from "@/registry/lib/motion-variants";

/**
 * Site chrome, not a numbered catalog module — client-specific footer
 * matching the live WordPress site's layout: stacked logo + tagline + ACNC
 * badge on the left, an Email / Location / Social info grid on the right.
 */
export function SiteFooter() {
  return (
    <footer className="bg-brand-green px-6 py-16 text-white">
      <ScrollReveal effect="F" as="div" className="mx-auto grid max-w-6xl gap-12 sm:grid-cols-2">
        <div>
          <Image
            src="/brand/9941-logo-stacked-reverse.png"
            alt="Ninetynine41"
            width={220}
            height={76}
            className="h-16 w-auto"
          />
          <p className="mt-4 font-display text-2xl text-white/90">Hope loading&hellip;</p>
          <Image src="/brand/acnc-badge.png" alt="ACNC Registered Charity" width={72} height={72} className="mt-6 h-16 w-16" />
          <p className="mt-6 max-w-xs text-sm text-white/70">
            We are an <span className="font-semibold text-white">action-focused</span> charity bringing hope and
            dignity to those who need it most. <span className="font-semibold text-white">Ninetynine41</span> is a
            registered ACNC charity.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-1">
          <div className="border-b border-white/15 pb-4">
            <span className="text-sm font-semibold tracking-wide text-white/60 uppercase">Email</span>
            <a href="mailto:info@ninetynine41.org" className="mt-1 block text-lg transition-colors hover:text-brand-orange">
              info@ninetynine41.org
            </a>
          </div>
          <div className="border-b border-white/15 pb-4">
            <span className="text-sm font-semibold tracking-wide text-white/60 uppercase">Location</span>
            <p className="mt-1 text-lg">Brisbane, Australia</p>
          </div>
          <div className="border-b border-white/15 pb-4">
            <span className="text-sm font-semibold tracking-wide text-white/60 uppercase">Social</span>
            <div className="mt-2 flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61574110970003" aria-label="Facebook" className="transition-colors hover:text-brand-orange">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/ninety_nine4one/" aria-label="Instagram" className="transition-colors hover:text-brand-orange">
                <InstagramIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 pt-6 text-sm text-white/50">
        Copyright &copy; Ninetynine41 {new Date().getFullYear()}. All Rights Reserved.
      </div>
    </footer>
  );
}
