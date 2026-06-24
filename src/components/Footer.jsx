import InstagramIcon from './InstagramIcon'

const footerLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  const handleClick = (href) => (e) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-white/5 bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 md:px-12 lg:px-20">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
          <div>
            <a
              href="#hero"
              onClick={handleClick('#hero')}
              className="flex items-center gap-2"
            >
              <span className="text-lg font-semibold text-white">
                zero2one <span className="text-cyan">labs</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-500">
              Taking your business from 0 to 1, online. Custom websites for small
              businesses and professionals.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleClick(link.href)}
                    className="text-sm text-gray-400 transition-colors hover:text-cyan"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-gray-500">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@zero2one.live"
                className="block break-all text-sm text-gray-400 transition-colors hover:text-cyan sm:break-normal"
              >
                contact@zero2one.live
              </a>
              <a
                href="https://instagram.com/zero2one.labs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-cyan"
              >
                <InstagramIcon size={16} />
                zero2one.labs
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-gray-600">
            © 2026 zero2one labs. All rights reserved.
          </p>
          <a
            href="#terms"
            onClick={handleClick('#terms')}
            className="text-xs text-gray-600 transition-colors hover:text-gray-400"
          >
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  )
}
