import Link from "next/link";
import { ArrowRight, CheckCircle, Rocket, Users, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-mono text-xl font-bold">
              THE INDIAN STARTUP
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/playbooks" className="text-sm hover:text-accent">
                Playbooks
              </Link>
              <Link href="/pricing" className="text-sm hover:text-accent">
                Pricing
              </Link>
              <Link href="/login" className="btn-primary text-xs">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-gray-200 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="font-mono text-5xl font-bold leading-tight">
              Your Startup.<br />
              Launched in 30 Days.
            </h1>
            <p className="mt-6 text-xl text-gray-600">
              Step-by-step India-specific playbooks for founders who want to move fast.
              From incorporation to funding to revenue.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <Link href="/playbooks/30-day-launch" className="btn-primary">
                Start with ₹999 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                View All Playbooks
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              Join 500+ founders building in India
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 max-w-2xl">
            <h2 className="font-mono text-3xl font-bold">
              Everything you need to build in India
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Because building a startup in India isn&apos;t just about hustle—it&apos;s about knowing the system.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-gray-200 p-8 transition-all hover:border-gray-400">
              <Rocket className="mb-4 h-8 w-8" />
              <h3 className="mb-2 font-mono text-xl font-semibold">
                Launch Fast
              </h3>
              <p className="text-gray-600">
                30-day sprint from idea to incorporated company with GST, PAN, and basic compliance sorted.
              </p>
            </div>

            <div className="border border-gray-200 p-8 transition-all hover:border-gray-400">
              <Users className="mb-4 h-8 w-8" />
              <h3 className="mb-2 font-mono text-xl font-semibold">
                Real Reviews
              </h3>
              <p className="text-gray-600">
                Community-verified reviews of incubators, accelerators, and service providers. No paid placements.
              </p>
            </div>

            <div className="border border-gray-200 p-8 transition-all hover:border-gray-400">
              <TrendingUp className="mb-4 h-8 w-8" />
              <h3 className="mb-2 font-mono text-xl font-semibold">
                Get Funded
              </h3>
              <p className="text-gray-600">
                Navigate grants, debt, and equity funding with templates, eligibility checkers, and insider tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Playbooks Preview */}
      <section className="border-t border-gray-200 bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-mono text-3xl font-bold">
              The Complete Founder Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              8 playbooks. Sequential learning. Annual access.
            </p>
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {[
              { code: "P1", title: "30-Day India Launch Sprint", price: "₹999" },
              { code: "P2", title: "Incorporation & Compliance Kit", price: "₹2,999" },
              { code: "P3", title: "Funding in India", price: "₹3,999" },
              { code: "P4", title: "Finance Stack", price: "₹2,999" },
              { code: "P5", title: "Legal Stack", price: "₹4,999" },
              { code: "P6", title: "Sales & GTM", price: "₹3,999" },
              { code: "P7", title: "State-wise Scheme Map", price: "₹2,999" },
              { code: "P8", title: "Investor-ready Data Room", price: "₹4,999" },
            ].map((playbook) => (
              <div
                key={playbook.code}
                className="flex items-center justify-between border border-gray-200 bg-white p-6 transition-all hover:border-gray-400"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-medium">{playbook.code}</span>
                  <h3 className="font-semibold">{playbook.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{playbook.price}</span>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <div className="mx-auto max-w-2xl border-2 border-accent bg-accent/5 p-8">
              <h3 className="font-mono text-2xl font-bold">All-Access Pass</h3>
              <p className="mt-2 text-gray-600">
                Get all 8 playbooks + community access + quarterly updates
              </p>
              <p className="mt-4 font-mono text-3xl font-bold">₹19,999/year</p>
              <p className="text-sm text-gray-500 line-through">₹27,993</p>
              <Link href="/pricing" className="btn-primary mt-6">
                Save 29% with All-Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-mono text-3xl font-bold">
            Ready to launch your startup?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start with the 30-Day India Launch Sprint. No fluff. Just action.
          </p>
          <Link href="/playbooks/30-day-launch" className="btn-primary mt-8">
            Get Started for ₹999 <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            <CheckCircle className="inline h-4 w-4" /> 30-day money-back guarantee
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-mono text-sm font-semibold">THE INDIAN STARTUP</p>
              <p className="mt-1 text-sm text-gray-600">
                © 2024. Built for Indian founders.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <a
                href="mailto:support@theindianstartup.in"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                support@theindianstartup.in
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}