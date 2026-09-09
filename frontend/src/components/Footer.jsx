import Brand from "../components/Brand";

const Icon = ({ children, className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
);

const FacebookIcon = p => <Icon {...p}><path d="M15 3h-2a5 5 0 0 0-5 5v2H6v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" fill="currentColor" stroke="none" /></Icon>;
const TwitterIcon = p => <Icon {...p}><path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.6 4.6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5v.1a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.8 2.8A8 8 0 0 1 2 18.6a11.3 11.3 0 0 0 6.3 1.9c7.5 0 11.7-6.4 11.7-11.9v-.5c.8-.6 1.5-1.3 2-2.3z" fill="currentColor" stroke="none" /></Icon>;
const InstagramIcon = p => <Icon {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></Icon>;
const LinkedinIcon = p => <Icon {...p}><rect x="3" y="9" width="4" height="12" /><circle cx="5" cy="4.5" r="1.75" /><path d="M11 21v-7a3 3 0 0 1 6 0v7M11 9v12" /></Icon>;
const YoutubeIcon = p => <Icon {...p}><rect x="2.5" y="6" width="19" height="12" rx="3.5" /><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" /></Icon>;
const GooglePlayGlyph = p => <svg viewBox="0 0 24 24" className={p.className}><path d="M4 3.5c-.3.3-.5.7-.5 1.2v14.6c0 .5.2.9.5 1.2l.1.1L13 12 4.1 3.4z" fill="#00D2FF" /><path d="M16 9l-3-3-8.9-4.5c-.4.2-.7.6-.7 1.1L4 12l9-3z" fill="#00E676" transform="translate(-1 3)" /><path d="M4.1 20.6L13 12l3 3-11 6.1c-.3.1-.6.1-.9 0z" fill="#FF3D57" /><path d="M16 12l3.5-1.9c.7-.4.7-1.4 0-1.8L16 6.5 13 9.5z" fill="#FFC107" /></svg>;
const AppleGlyph = p => <svg viewBox="0 0 24 24" className={p.className} fill="currentColor"><path d="M16.5 1c.1 1-.3 2-1 2.7-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2 1-2.7.7-.8 1.9-1.3 2.8-1.3zM19.9 17c-.5 1.1-.7 1.6-1.4 2.6-.9 1.4-2.2 3.1-3.8 3.1-1.4 0-1.8-.9-3.7-.9s-2.4.9-3.7.9c-1.6 0-2.8-1.6-3.7-3-2.5-3.9-2.8-8.5-1.2-10.9 1.1-1.7 2.9-2.7 4.5-2.7 1.6 0 2.7 1 4 1 1.3 0 2.1-1 4-1 1.4 0 2.9.8 4 2.1-3.5 1.9-3 6.9 1 8.8z" /></svg>;

const quickLinks = ["About Us", "Careers", "Terms & Conditions", "Privacy Policy", "Testimonials", "Sitemap", "FAQs"];
const socials = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Twitter", Icon: TwitterIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "LinkedIn", Icon: LinkedinIcon },
  { label: "YouTube", Icon: YoutubeIcon },
];

export default function Footer() {
  return (
    <footer className="block w-full bg-white text-[#3C4859]" style={{ display: "block", width: "100%" }}>
      <div className="flex w-full flex-col" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div className="w-full border-b border-[#E4E6EB] bg-[#EDEEF0]">
          <div className="mx-auto flex w-full max-w-6xl flex-col divide-y divide-[#D8DBE0] px-4 py-8 sm:flex-row sm:divide-x sm:divide-y-0 sm:px-6">
            <div className="flex flex-1 flex-col items-center gap-2 px-4 py-6 text-center first:pt-0 sm:py-4"><h3 className="text-xl font-bold text-[#2B3646] sm:text-2xl">Find Property</h3><p className="max-w-xs text-sm text-[#6B7688]">Select from thousands of options, without brokerage.</p><a href="#" className="mt-3 w-full max-w-[220px] rounded-md bg-[#3C4859] px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2B3646] sm:w-auto">Find Now</a></div>
            <div className="flex flex-1 flex-col items-center gap-2 px-4 py-6 text-center last:pb-0 sm:py-4"><h3 className="text-xl font-bold text-[#2B3646] sm:text-2xl">List Your Property</h3><p className="max-w-xs text-sm text-[#6B7688]">For Free. Without any brokerage.</p><a href="#" className="mt-3 w-full max-w-[220px] rounded-md bg-[#3C4859] px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2B3646] sm:w-auto">Free Posting</a></div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-10 sm:px-6">
          <div className="mb-6 flex w-full justify-center"><Brand /></div>
          <nav aria-label="Footer" className="flex w-full flex-wrap justify-center gap-x-8 gap-y-3 px-2 text-center text-sm font-medium text-[#6B7688] sm:gap-x-10">{quickLinks.map(link => <a key={link} href="#" className="transition-colors hover:text-[#E5342B] hover:underline hover:underline-offset-4">{link}</a>)}</nav>
          <div className="mt-8 w-full border-t border-[#E4E6EB]" />
          <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-8"><a href="#" className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white transition-transform hover:-translate-y-0.5"><GooglePlayGlyph className="h-6 w-6 shrink-0" /><span className="leading-tight"><span className="block text-[10px] text-white/80">GET IT ON</span><span className="block text-sm font-semibold">Google Play</span></span></a><a href="#" className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-white transition-transform hover:-translate-y-0.5"><AppleGlyph className="h-6 w-6 shrink-0" /><span className="leading-tight"><span className="block text-[10px] text-white/80">Download on the</span><span className="block text-sm font-semibold">App Store</span></span></a></div>
          <div className="flex w-full flex-wrap items-center justify-center gap-4 pt-6">{socials.map(({ label, Icon: SocialIcon }) => <a key={label} href="#" aria-label={label} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EDEEF0] text-[#3C4859] transition-colors hover:bg-[#E5342B] hover:text-white"><SocialIcon className="h-4 w-4" /></a>)}</div>
          <p className="w-full px-2 pb-8 pt-6 text-center text-sm text-[#8B96A8]">© 2013-{new Date().getFullYear().toString().slice(-2)} Your Property Platform Private Limited.</p>
        </div>
      </div>
    </footer>
  );
}
