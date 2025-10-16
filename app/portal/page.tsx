import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, UserCog, ShieldCheck } from "lucide-react"

export default function PortalPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 md:px-6 py-16">
      <header className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Welcome to{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
            Evalify
          </span>{" "}
          Portal
        </h1>
        <p className="text-muted-foreground mt-2">Choose your role to continue</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Student */}
        <Card className="rounded-2xl hover:shadow-sm transition-shadow">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <GraduationCap size={20} />
            </div>
            <CardTitle className="mt-2">Student</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Attempt tests, view scores, and read detailed feedback.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white"
            >
              <Link href="/student/login">Login as Student</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Teacher */}
        <Card className="rounded-2xl hover:shadow-sm transition-shadow">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <UserCog size={20} />
            </div>
            <CardTitle className="mt-2">Teacher</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Create tests, monitor progress, and manage results.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white"
            >
              <Link href="/teacher/login">Login as Teacher</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Admin */}
        <Card className="rounded-2xl hover:shadow-sm transition-shadow">
          <CardHeader>
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <CardTitle className="mt-2">Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Oversee performance, export reports, and manage access.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-white"
            >
              <Link href="/admin/login">Login as Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
