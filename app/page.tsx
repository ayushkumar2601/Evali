import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RoleNav } from "@/components/evalify/role-nav"
import { SiteFooter } from "@/components/evalify/footer"
import { GraduationCap, BarChart3, Users } from "lucide-react"

export default function Page() {
  return (
    <main className="bg-background text-foreground">
      <RoleNav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="inline-block rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
              Smart, Fair & Instant
            </p>
            <h1 className="text-balance text-4xl md:text-5xl font-semibold leading-tight">
              Empowering Educators with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
                AI-Powered Evaluation
              </span>
              .
            </h1>
            <p className="text-muted-foreground text-pretty">
              Automate grading, get instant insights, and ensure fair assessment — all in one platform. Designed for
              Students, Teachers, and Admins with transparency at its core.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white hover:opacity-90"
              >
                <Link href="/portal">Enter the Portal</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>

            <ul className="mt-4 text-sm text-muted-foreground grid grid-cols-1 sm:grid-cols-3 gap-2">
              <li>• Instant AI Grading</li>
              <li>• Feedback Analytics</li>
              <li>• Multi-Role Access</li>
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl border bg-card shadow-sm p-4 md:p-6">
              <img
                src="/educational-ai-analytics-dashboard-mockup.jpg"
                alt="Evalify dashboard mockup showing analytics"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">
          Built for modern, fair, and faster evaluation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-medium">AI Grading</h3>
              <p className="text-sm text-muted-foreground">
                Instant, consistent, and transparent evaluation for objective and subjective questions.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <BarChart3 size={20} />
              </div>
              <h3 className="font-medium">Feedback Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Personalized insights for every student with class-wide performance trends.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardContent className="p-6 space-y-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users size={20} />
              </div>
              <h3 className="font-medium">Multi-Role Access</h3>
              <p className="text-sm text-muted-foreground">
                Purpose-built experiences for Students, Teachers, and Admins — secure and simple.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="text-xs font-medium text-primary mb-2">Step 1</div>
              <h4 className="font-medium mb-1">Upload or Attempt Tests</h4>
              <p className="text-sm text-muted-foreground">Students attempt MCQs & subjective questions online.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="text-xs font-medium text-primary mb-2">Step 2</div>
              <h4 className="font-medium mb-1">AI Grades Instantly</h4>
              <p className="text-sm text-muted-foreground">Objective scores + AI-evaluated subjective answers.</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <div className="text-xs font-medium text-primary mb-2">Step 3</div>
              <h4 className="font-medium mb-1">View Feedback & Reports</h4>
              <p className="text-sm text-muted-foreground">Clear feedback and analytics for teachers and admins.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <h2 className="text-center text-2xl md:text-3xl font-semibold mb-8">What educators say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-pretty">“Evalify saved us 70% grading time!”</p>
              <p className="text-xs text-muted-foreground mt-2">— Dr. Meera, Professor</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-pretty">“My students love the instant feedback.”</p>
              <p className="text-xs text-muted-foreground mt-2">— Mr. Raj, Teacher</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-6">
              <p className="text-pretty">“Setup was smooth and the insights are powerful.”</p>
              <p className="text-xs text-muted-foreground mt-2">— Ms. Khan, Principal</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Ready to accelerate evaluation?</h3>
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white hover:opacity-90 rounded-full px-8"
        >
          <Link href="/portal">Enter the Portal</Link>
        </Button>
      </section>

      <SiteFooter />
    </main>
  )
}
