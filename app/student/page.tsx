// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// type TestMeta = {
//   id: string
//   name: string
//   duration: string
// }

// type MCQ = {
//   id: string
//   q: string
//   options: { key: string; label: string }[]
//   answer: string
// }

// type ResultRow = {
//   id: string
//   name: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// const tests: TestMeta[] = [
//   { id: "t1", name: "Algebra Basics", duration: "30 mins" },
//   { id: "t2", name: "World History", duration: "30 mins" },
//   { id: "t3", name: "Physics Fundamentals", duration: "30 mins" },
//   { id: "t4", name: "Literature Analysis", duration: "30 mins" },
// ]

// // 10 MCQs (generic placeholders)
// const mcqs: MCQ[] = [
//   {
//     id: "q1",
//     q: "1) Which is a prime number?",
//     options: [
//       { key: "A", label: "15" },
//       { key: "B", label: "17" },
//       { key: "C", label: "21" },
//       { key: "D", label: "27" },
//     ],
//     answer: "B",
//   },
//   {
//     id: "q2",
//     q: "2) Speed is defined as:",
//     options: [
//       { key: "A", label: "Distance/Time" },
//       { key: "B", label: "Time/Distance" },
//       { key: "C", label: "Mass/Time" },
//       { key: "D", label: "Force/Area" },
//     ],
//     answer: "A",
//   },
//   {
//     id: "q3",
//     q: "3) The Renaissance began in:",
//     options: [
//       { key: "A", label: "France" },
//       { key: "B", label: "Germany" },
//       { key: "C", label: "Italy" },
//       { key: "D", label: "England" },
//     ],
//     answer: "C",
//   },
//   {
//     id: "q4",
//     q: "4) Synonym of 'concise':",
//     options: [
//       { key: "A", label: "Verbose" },
//       { key: "B", label: "Succinct" },
//       { key: "C", label: "Rambling" },
//       { key: "D", label: "Elaborate" },
//     ],
//     answer: "B",
//   },
//   {
//     id: "q5",
//     q: "5) H2O is:",
//     options: [
//       { key: "A", label: "Hydrogen Peroxide" },
//       { key: "B", label: "Water" },
//       { key: "C", label: "Oxygen" },
//       { key: "D", label: "Hydrogen" },
//     ],
//     answer: "B",
//   },
//   {
//     id: "q6",
//     q: "6) Acceleration unit (SI):",
//     options: [
//       { key: "A", label: "m/s" },
//       { key: "B", label: "m/s²" },
//       { key: "C", label: "N" },
//       { key: "D", label: "kg" },
//     ],
//     answer: "B",
//   },
//   {
//     id: "q7",
//     q: "7) 3x = 12. x =",
//     options: [
//       { key: "A", label: "3" },
//       { key: "B", label: "4" },
//       { key: "C", label: "6" },
//       { key: "D", label: "9" },
//     ],
//     answer: "B",
//   },
//   {
//     id: "q8",
//     q: "8) The author of '1984':",
//     options: [
//       { key: "A", label: "George Orwell" },
//       { key: "B", label: "Aldous Huxley" },
//       { key: "C", label: "J.K. Rowling" },
//       { key: "D", label: "Ernest Hemingway" },
//     ],
//     answer: "A",
//   },
//   {
//     id: "q9",
//     q: "9) The capital of Japan:",
//     options: [
//       { key: "A", label: "Kyoto" },
//       { key: "B", label: "Osaka" },
//       { key: "C", label: "Tokyo" },
//       { key: "D", label: "Nagoya" },
//     ],
//     answer: "C",
//   },
//   {
//     id: "q10",
//     q: "10) Photosynthesis occurs in:",
//     options: [
//       { key: "A", label: "Mitochondria" },
//       { key: "B", label: "Chloroplasts" },
//       { key: "C", label: "Nucleus" },
//       { key: "D", label: "Ribosomes" },
//     ],
//     answer: "B",
//   },
// ]

// export default function StudentDashboardPage() {
//   const router = useRouter()
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [result, setResult] = useState<ResultRow | null>(null)
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Gate: simple client-side session
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {
//         // no-op
//       }
//     }
//   }, [])

//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   const mcqScore = useMemo(() => {
//     if (!submitted) return 0
//     let score = 0
//     for (const q of mcqs) {
//       if (answers[q.id] === q.answer) score += 1
//     }
//     return score
//   }, [answers, submitted])

//   function handleAttempt(test: TestMeta) {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//   }

//   function submitTest() {
//     // Compute MCQ + simple placeholder subjective (out of 20)
//     const subjective = 14 // placeholder score, UI-only
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest?.id}-${Date.now()}`,
//       name: selectedTest?.name ?? "Untitled Test",
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//     // keep view as give-test to show results on the same page (spec)
//   }

//   function logout() {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       {/* Top bar for small screens */}
//       <div className="mb-4 md:hidden flex items-center gap-2 overflow-x-auto">
//         <Button
//           variant={active === "dashboard" ? "default" : "ghost"}
//           className="rounded-xl"
//           onClick={() => setActive("dashboard")}
//         >
//           Dashboard
//         </Button>
//         <Button
//           variant={active === "give-test" ? "default" : "ghost"}
//           className="rounded-xl"
//           onClick={() => setActive("give-test")}
//         >
//           Give Test
//         </Button>
//         <Button
//           variant={active === "results" ? "default" : "ghost"}
//           className="rounded-xl"
//           onClick={() => setActive("results")}
//         >
//           My Results
//         </Button>
//         <Button variant="ghost" className="rounded-xl" onClick={logout}>
//           Logout
//         </Button>
//       </div>

//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar (md+) */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2">
//             <Button
//               variant={active === "dashboard" ? "default" : "ghost"}
//               className="mb-1 w-full justify-start rounded-xl"
//               onClick={() => setActive("dashboard")}
//             >
//               Dashboard
//             </Button>
//             <Button
//               variant={active === "give-test" ? "default" : "ghost"}
//               className="mb-1 w-full justify-start rounded-xl"
//               onClick={() => setActive("give-test")}
//             >
//               Give Test
//             </Button>
//             <Button
//               variant={active === "results" ? "default" : "ghost"}
//               className="mb-1 w-full justify-start rounded-xl"
//               onClick={() => setActive("results")}
//             >
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main panel */}
//         <section>
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               {/* Available Tests */}
//               <div>
//                 <h2 className="mb-3 text-xl font-medium">Available Tests</h2>
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {tests.map((t) => (
//                     <Card
//                       key={t.id}
//                       className="rounded-2xl border-border bg-card/80 shadow-sm transition hover:shadow-md"
//                     >
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button
//                           className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                           onClick={() => handleAttempt(t)}
//                         >
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {active === "give-test" && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-semibold">{selectedTest ? selectedTest.name : "Give Test"}</h1>
//                   <p className="text-muted-foreground">Answer 10 MCQs and upload one handwritten answer.</p>
//                 </div>
//                 <div className="hidden sm:block text-sm text-muted-foreground">
//                   {selectedTest?.duration ?? "30 mins"}
//                 </div>
//               </div>

//               {/* MCQs */}
//               <div className="space-y-4">
//                 {mcqs.map((q) => (
//                   <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                     <CardHeader>
//                       <CardTitle className="text-base">{q.q}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <RadioGroup
//                         value={answers[q.id] ?? ""}
//                         onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
//                         className="grid gap-3"
//                       >
//                         {q.options.map((op) => (
//                           <div key={op.key} className="flex items-center gap-3">
//                             <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
//                             <Label htmlFor={`${q.id}-${op.key}`}>
//                               {op.key}. {op.label}
//                             </Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Upload field */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input
//                     type="file"
//                     accept=".jpg,.jpeg,.png,.pdf"
//                     onChange={(e) => {
//                       const f = e.target.files?.[0] ?? null
//                       setUpload(f)
//                     }}
//                   />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex items-center justify-end">
//                 <Button
//                   className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                   onClick={submitTest}
//                 >
//                   Submit
//                 </Button>
//               </div>

//               {/* Results on same page after submission */}
//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">MCQ Score</CardTitle>
//                         <CardDescription className="text-2xl">{result.mcqScore} / 10</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">AI Evaluated Subjective</CardTitle>
//                         <CardDescription className="text-2xl">{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">Total Marks</CardTitle>
//                         <CardDescription className="text-2xl">{result.total} / 30</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>

//                   {/* Feedback area with light blue background and rounded borders */}
//                   <div className="rounded-xl p-4 md:p-5 bg-[var(--info-bg)]">
//                     <h3 className="mb-1 text-sm font-medium text-foreground/80">Feedback</h3>
//                     <p className="text-sm text-foreground/80">
//                       Good attempt with clear understanding of fundamentals. For higher marks, elaborate reasoning in
//                       the subjective response and double-check MCQs 5 and 7.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle className="text-base">{r.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         MCQ: {r.mcqScore}/10 • Subjective: {r.subjectiveScore}/20 • Total: {r.total}/30
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }







// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Input } from "@/components/ui/input";

// type TestMeta = {
//   id: string;
//   name: string;
//   duration: string;
// };

// type MCQ = {
//   id: string;
//   question: string;
//   options: { key: string; label: string }[];
//   answer: string;
// };

// type ResultRow = {
//   id: string;
//   testName: string;
//   date: string;
//   mcqScore: number;
//   subjectiveScore: number;
//   total: number;
// };

// // Example: Normally this comes from API
// const TESTS: TestMeta[] = [
//   { id: "t1", name: "Algebra Basics", duration: "30 mins" },
//   { id: "t2", name: "World History", duration: "30 mins" },
//   { id: "t3", name: "Physics Fundamentals", duration: "30 mins" },
//   { id: "t4", name: "Literature Analysis", duration: "30 mins" },
// ];

// // Dynamic placeholder MCQs generator
// const generateMCQs = (testId: string, count: number = 10): MCQ[] => {
//   return Array.from({ length: count }, (_, i) => ({
//     id: `${testId}-q${i + 1}`,
//     question: `Question ${i + 1} for ${testId}`,
//     options: [
//       { key: "A", label: `Option A` },
//       { key: "B", label: `Option B` },
//       { key: "C", label: `Option C` },
//       { key: "D", label: `Option D` },
//     ],
//     answer: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
//   }));
// };

// export default function StudentDashboardPage() {
//   const router = useRouter();
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard");
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null);
//   const [mcqs, setMcqs] = useState<MCQ[]>([]);
//   const [answers, setAnswers] = useState<Record<string, string>>({});
//   const [upload, setUpload] = useState<File | null>(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [result, setResult] = useState<ResultRow | null>(null);
//   const [history, setHistory] = useState<ResultRow[]>([]);

//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

//   // Client-side session check
//   useEffect(() => {
//     setLoggedIn(localStorage.getItem("evalify_student_logged_in") === "true");
//   }, []);

//   // Load history from localStorage
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results");
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw));
//       } catch {
//         // ignore
//       }
//     }
//   }, []);

//   // Save history
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history));
//   }, [history]);

//   // Compute MCQ score dynamically
//   const mcqScore = useMemo(() => {
//     if (!submitted) return 0;
//     return mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0);
//   }, [answers, submitted, mcqs]);

//   // Start attempt
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test);
//     setActive("give-test");
//     setAnswers({});
//     setUpload(null);
//     setSubmitted(false);
//     setResult(null);
//     setMcqs(generateMCQs(test.id)); // dynamically generate MCQs
//   };

//   const submitTest = () => {
//     const subjectiveScore = Math.floor(Math.random() * 21); // placeholder AI evaluation (0-20)
//     const total = mcqScore + subjectiveScore;
//     const row: ResultRow = {
//       id: `${selectedTest?.id}-${Date.now()}`,
//       testName: selectedTest?.name || "Untitled Test",
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore,
//       total,
//     };
//     setResult(row);
//     setHistory((prev) => [row, ...prev]);
//     setSubmitted(true);
//   };

//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in");
//     router.push("/student/login");
//   };

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       {/* Top nav for small screens */}
//       <div className="mb-4 md:hidden flex items-center gap-2 overflow-x-auto">
//         <Button variant={active === "dashboard" ? "default" : "ghost"} onClick={() => setActive("dashboard")}>
//           Dashboard
//         </Button>
//         <Button variant={active === "give-test" ? "default" : "ghost"} onClick={() => setActive("give-test")}>
//           Give Test
//         </Button>
//         <Button variant={active === "results" ? "default" : "ghost"} onClick={() => setActive("results")}>
//           My Results
//         </Button>
//         <Button variant="ghost" onClick={logout}>
//           Logout
//         </Button>
//       </div>

//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2">
//             <Button variant={active === "dashboard" ? "default" : "ghost"} className="mb-1 w-full justify-start" onClick={() => setActive("dashboard")}>
//               Dashboard
//             </Button>
//             <Button variant={active === "give-test" ? "default" : "ghost"} className="mb-1 w-full justify-start" onClick={() => setActive("give-test")}>
//               Give Test
//             </Button>
//             <Button variant={active === "results" ? "default" : "ghost"} className="mb-1 w-full justify-start" onClick={() => setActive("results")}>
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Select a test to attempt or review your previous results.</p>
//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {TESTS.map((t) => (
//                   <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
//                     <CardHeader>
//                       <CardTitle className="text-base">{t.name}</CardTitle>
//                       <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                       <Button
//                         className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                         onClick={() => handleAttempt(t)}
//                       >
//                         Attempt Now
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//                   <p className="text-muted-foreground">Answer the MCQs and upload your handwritten response.</p>
//                 </div>
//                 <div className="hidden sm:block text-sm text-muted-foreground">{selectedTest.duration}</div>
//               </div>

//               {/* MCQs */}
//               <div className="space-y-4">
//                 {mcqs.map((q) => (
//                   <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                     <CardHeader>
//                       <CardTitle className="text-base">{q.question}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <RadioGroup
//                         value={answers[q.id] ?? ""}
//                         onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
//                         className="grid gap-3"
//                       >
//                         {q.options.map((op) => (
//                           <div key={op.key} className="flex items-center gap-3">
//                             <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
//                             <Label htmlFor={`${q.id}-${op.key}`}>
//                               {op.key}. {op.label}
//                             </Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload Handwritten Answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex justify-end">
//                 <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
//                   Submit
//                 </Button>
//               </div>

//               {/* Results after submission */}
//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>MCQ Score</CardTitle>
//                         <CardDescription className="text-2xl">{result.mcqScore} / {mcqs.length}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>AI Evaluated Subjective</CardTitle>
//                         <CardDescription className="text-2xl">{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>Total Marks</CardTitle>
//                         <CardDescription className="text-2xl">{result.total} / {mcqs.length + 20}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle>{r.testName}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         MCQ: {r.mcqScore}/{mcqs.length} • Subjective: {r.subjectiveScore}/20 • Total: {r.total}/{mcqs.length + 20}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }






// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// // Types
// type TestMeta = {
//   id: string
//   name: string
//   duration: string
//   mcqs: MCQ[]
// }

// type MCQ = {
//   id: string
//   q: string
//   options: { key: string; label: string }[]
//   answer: string
// }

// type ResultRow = {
//   id: string
//   testId: string
//   name: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function StudentDashboardPage() {
//   const router = useRouter()

//   // UI state
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [result, setResult] = useState<ResultRow | null>(null)

//   // Dynamic tests & results
//   const [tests, setTests] = useState<TestMeta[]>([])
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Session state
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

//   // Gate: student session check
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   // Load posted tests from teacher
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         const posted: TestMeta[] = JSON.parse(raw)
//         setTests(posted)
//       } catch {
//         setTests([])
//       }
//     }
//   }, [])

//   // Load previous student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Persist results to localStorage
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   // Calculate MCQ score
//   const mcqScore = useMemo(() => {
//     if (!submitted) return 0
//     if (!selectedTest) return 0
//     let score = 0
//     for (const q of selectedTest.mcqs) {
//       if (answers[q.id] === q.answer) score += 1
//     }
//     return score
//   }, [answers, submitted, selectedTest])

//   // Attempt a test
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//   }

//   // Submit test
//   const submitTest = () => {
//     if (!selectedTest) return
//     const subjective = 14 // placeholder score for prototype
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest.id}-${Date.now()}`,
//       testId: selectedTest.id,
//       name: selectedTest.name,
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//   }

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       {/* Top bar for small screens */}
//       <div className="mb-4 md:hidden flex items-center gap-2 overflow-x-auto">
//         <Button variant={active === "dashboard" ? "default" : "ghost"} className="rounded-xl" onClick={() => setActive("dashboard")}>
//           Dashboard
//         </Button>
//         <Button variant={active === "give-test" ? "default" : "ghost"} className="rounded-xl" onClick={() => setActive("give-test")}>
//           Give Test
//         </Button>
//         <Button variant={active === "results" ? "default" : "ghost"} className="rounded-xl" onClick={() => setActive("results")}>
//           My Results
//         </Button>
//         <Button variant="ghost" className="rounded-xl" onClick={logout}>
//           Logout
//         </Button>
//       </div>

//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar (md+) */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2">
//             <Button variant={active === "dashboard" ? "default" : "ghost"} className="mb-1 w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
//               Dashboard
//             </Button>
//             <Button variant={active === "give-test" ? "default" : "ghost"} className="mb-1 w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
//               Give Test
//             </Button>
//             <Button variant={active === "results" ? "default" : "ghost"} className="mb-1 w-full justify-start rounded-xl" onClick={() => setActive("results")}>
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               {/* Available Tests */}
//               <div>
//                 <h2 className="mb-3 text-xl font-medium">Available Tests</h2>
//                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                   {tests.length === 0 && <p className="text-muted-foreground">No tests available yet.</p>}
//                   {tests.map((t) => (
//                     <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm transition hover:shadow-md">
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//                   <p className="text-muted-foreground">Answer MCQs and upload a handwritten answer.</p>
//                 </div>
//                 <div className="hidden sm:block text-sm text-muted-foreground">{selectedTest.duration}</div>
//               </div>

//               {/* MCQs */}
//               <div className="space-y-4">
//                 {selectedTest.mcqs.map((q) => (
//                   <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                     <CardHeader>
//                       <CardTitle className="text-base">{q.q}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <RadioGroup value={answers[q.id] ?? ""} onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))} className="grid gap-3">
//                         {q.options.map((op) => (
//                           <div key={op.key} className="flex items-center gap-3">
//                             <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
//                             <Label htmlFor={`${q.id}-${op.key}`}>{op.key}. {op.label}</Label>
//                           </div>
//                         ))}
//                       </RadioGroup>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex items-center justify-end">
//                 <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
//                   Submit
//                 </Button>
//               </div>

//               {/* Show result after submission */}
//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">MCQ Score</CardTitle>
//                         <CardDescription className="text-2xl">{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">AI Evaluated Subjective</CardTitle>
//                         <CardDescription className="text-2xl">{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle className="text-base">Total Marks</CardTitle>
//                         <CardDescription className="text-2xl">{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>

//                   <div className="rounded-xl p-4 md:p-5 bg-[var(--info-bg)]">
//                     <h3 className="mb-1 text-sm font-medium text-foreground/80">Feedback</h3>
//                     <p className="text-sm text-foreground/80">
//                       Good attempt. For higher marks, elaborate reasoning in the subjective answer and double-check MCQs.
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle className="text-base">{r.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }




"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type MCQ = {
  id: string
  q: string
  options: { key: string; label: string }[]
  answer: string
}

type TestMeta = {
  id: string
  name: string
  duration: string
  mcqs: MCQ[]
}

type ResultRow = {
  id: string
  testId: string
  studentName: string
  studentEmail: string
  testName: string
  date: string
  mcqScore: number
  subjectiveScore: number
  total: number
}

export default function StudentDashboardPage() {
  const router = useRouter()

  const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
  const [tests, setTests] = useState<TestMeta[]>([])
  const [history, setHistory] = useState<ResultRow[]>([])
  const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [studentName, setStudentName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [upload, setUpload] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [result, setResult] = useState<ResultRow | null>(null)
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

  // Check login
  useEffect(() => {
    const flag = localStorage.getItem("evalify_student_logged_in") === "true"
    setLoggedIn(flag)
  }, [])

  // Load tests
  useEffect(() => {
    const raw = localStorage.getItem("teacher_tests")
    if (raw) {
      try {
        const posted = JSON.parse(raw) as any[]
        const normalized: TestMeta[] = posted.map((t, idx) => ({
          id: t.id ?? `test-${idx}`,
          name: t.name,
          duration: t.duration ?? "30m",
          mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
            id: q.id ?? `q${i}`,
            q: q.question ?? q.q ?? "Untitled Question",
            options: (q.options ?? []).map((opt: string, oi: number) => ({
              key: `opt${oi}`,
              label: typeof opt === "string" ? opt : opt.label,
            })),
            answer: typeof q.correctIndex === "number" ? `opt${q.correctIndex}` : q.answer ?? "opt0",
          })),
        }))
        setTests(normalized)
      } catch {
        setTests([])
      }
    }
  }, [])

  // Load previous results
  useEffect(() => {
    const raw = localStorage.getItem("evalify_results")
    if (raw) {
      try {
        setHistory(JSON.parse(raw))
      } catch {}
    }
  }, [])

  // Persist results
  useEffect(() => {
    localStorage.setItem("evalify_results", JSON.stringify(history))
  }, [history])

  // MCQ score calculation
  const mcqScore = useMemo(() => {
    if (!submitted || !selectedTest) return 0
    return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
  }, [answers, submitted, selectedTest])

  // Attempt a test
  const handleAttempt = (test: TestMeta) => {
    setSelectedTest(test)
    setActive("give-test")
    setAnswers({})
    setStudentName("")
    setStudentEmail("")
    setUpload(null)
    setSubmitted(false)
    setResult(null)
  }

  // Submit test
  const submitTest = () => {
    if (!selectedTest || !studentName.trim() || !studentEmail.trim()) return
    const subjective = 14 // placeholder
    const total = mcqScore + subjective
    const row: ResultRow = {
      id: `${selectedTest.id}-${Date.now()}`,
      testId: selectedTest.id,
      studentName: studentName.trim(),
      studentEmail: studentEmail.trim(),
      testName: selectedTest.name,
      date: new Date().toLocaleString(),
      mcqScore,
      subjectiveScore: subjective,
      total,
    }
    setResult(row)
    setHistory((prev) => [row, ...prev])
    setSubmitted(true)
  }

  // Logout
  const logout = () => {
    localStorage.removeItem("evalify_student_logged_in")
    router.push("/student/login")
  }

  if (loggedIn === false) {
    return (
      <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
              Student Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/student/login">
              <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
                Go to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
      <div className="grid md:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar */}
        <aside className="hidden md:block">
          <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
            <Button variant={active === "dashboard" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
              Dashboard
            </Button>
            <Button variant={active === "give-test" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
              Give Test
            </Button>
            <Button variant={active === "results" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("results")}>
              My Results
            </Button>
            <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
              Logout
            </Button>
          </nav>
        </aside>

        {/* Main Panel */}
        <section>
          {/* Dashboard */}
          {active === "dashboard" && (
            <div className="space-y-6">
              <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
                Welcome back
              </h1>
              <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tests.length === 0 ? (
                  <p className="text-muted-foreground">No tests available yet.</p>
                ) : (
                  tests.map((t) => (
                    <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
                      <CardHeader>
                        <CardTitle className="text-base">{t.name}</CardTitle>
                        <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
                          Attempt Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Give Test */}
          {active === "give-test" && selectedTest && (
            <div className="space-y-6">
              <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
              <p className="text-muted-foreground">Enter your details and answer the MCQs below.</p>

              {/* Name & Email */}
              <Card className="rounded-2xl border-border bg-card/80">
                <CardContent className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Your Full Name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                </CardContent>
              </Card>

              {/* MCQs */}
              {selectedTest.mcqs.map((q) => (
                <Card key={q.id} className="rounded-2xl border-border bg-card/80">
                  <CardHeader>
                    <CardTitle className="text-base">{q.q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={answers[q.id] ?? ""} onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))} className="grid gap-3">
                      {q.options.map((op) => (
                        <div key={op.key} className="flex items-center gap-3">
                          <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
                          <Label htmlFor={`${q.id}-${op.key}`}>{op.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}

              {/* Upload */}
              <Card className="rounded-2xl border-border bg-card/80">
                <CardHeader>
                  <CardTitle className="text-base">Upload handwritten answer</CardTitle>
                  <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
                  {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
                  Submit
                </Button>
              </div>

              {submitted && result && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Evaluation Result</h2>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>MCQ Score</CardTitle>
                        <CardDescription>{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>AI Evaluated Subjective</CardTitle>
                        <CardDescription>{result.subjectiveScore} / 20</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>Total Marks</CardTitle>
                        <CardDescription>{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results */}
          {active === "results" && (
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">My Results</h1>
              {history.length === 0 ? (
                <p className="text-muted-foreground">No attempts yet.</p>
              ) : (
                <div className="grid gap-3">
                  {history.map((r) => (
                    <Card key={r.id} className="rounded-2xl border-border bg-card/80">
                      <CardHeader>
                        <CardTitle>{r.testName}</CardTitle>
                        <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                        Name: {r.studentName} • Email: {r.studentEmail} <br />
                        MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}




//////////////////---->MCQ working here
// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// // Types
// type MCQ = {
//   id: string
//   q: string
//   options: { key: string; label: string }[]
//   answer: string
// }

// type TestMeta = {
//   id: string
//   name: string
//   duration: string
//   mcqs: MCQ[]
// }

// type ResultRow = {
//   id: string
//   testId: string
//   name: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function StudentDashboardPage() {
//   const router = useRouter()

//   // UI state
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [result, setResult] = useState<ResultRow | null>(null)

//   // Dynamic tests & results
//   const [tests, setTests] = useState<TestMeta[]>([])
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Session state
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

//   // Gate: student session check
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   // Load posted tests from teacher and normalize structure
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         const posted = JSON.parse(raw) as any[]
//         const normalized: TestMeta[] = posted.map((t, idx) => ({
//           id: t.id ?? `test-${idx}`,
//           name: t.name,
//           duration: t.duration ?? "30m",
//           mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
//             id: q.id ?? `q${i}`,
//             q: q.question ?? q.q ?? "Untitled Question",
//             options: (q.options ?? []).map((opt: string, oi: number) => ({
//               key: `opt${oi}`,
//               label: typeof opt === "string" ? opt : opt.label,
//             })),
//             answer: typeof q.correctIndex === "number" ? `opt${q.correctIndex}` : q.answer ?? "opt0",
//           })),
//         }))
//         setTests(normalized)
//       } catch {
//         setTests([])
//       }
//     }
//   }, [])

//   // Load previous student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Persist results to localStorage
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   // Calculate MCQ score
//   const mcqScore = useMemo(() => {
//     if (!submitted || !selectedTest) return 0
//     return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
//   }, [answers, submitted, selectedTest])

//   // Attempt a test
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//   }

//   // Submit test
//   const submitTest = () => {
//     if (!selectedTest) return
//     const subjective = 14 // placeholder score
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest.id}-${Date.now()}`,
//       testId: selectedTest.id,
//       name: selectedTest.name,
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//   }

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
//             <Button variant={active === "dashboard" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
//               Dashboard
//             </Button>
//             <Button variant={active === "give-test" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
//               Give Test
//             </Button>
//             <Button variant={active === "results" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("results")}>
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main Panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {tests.length === 0 ? (
//                   <p className="text-muted-foreground">No tests available yet.</p>
//                 ) : (
//                   tests.map((t) => (
//                     <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//               <p className="text-muted-foreground">Answer the MCQs below.</p>

//               {selectedTest.mcqs.map((q) => (
//                 <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                   <CardHeader>
//                     <CardTitle className="text-base">{q.q}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <RadioGroup value={answers[q.id] ?? ""} onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))} className="grid gap-3">
//                       {q.options.map((op) => (
//                         <div key={op.key} className="flex items-center gap-3">
//                           <RadioGroupItem id={`${q.id}-${op.key}`} value={op.key} />
//                           <Label htmlFor={`${q.id}-${op.key}`}>{op.key}. {op.label}</Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex justify-end">
//                 <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
//                   Submit
//                 </Button>
//               </div>

//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>MCQ Score</CardTitle>
//                         <CardDescription>{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>AI Evaluated Subjective</CardTitle>
//                         <CardDescription>{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>Total Marks</CardTitle>
//                         <CardDescription>{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle>{r.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }











// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// // Types
// type MCQ = {
//   id: string
//   q: string
//   options: string[]
//   answer: string
// }

// type TestMeta = {
//   id: string
//   name: string
//   duration: string
//   mcqs: MCQ[]
// }

// type ResultRow = {
//   id: string
//   testId: string
//   studentName: string
//   studentEmail: string
//   testName: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function StudentDashboardPage() {
//   const router = useRouter()

//   // UI state
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [studentName, setStudentName] = useState("")
//   const [studentEmail, setStudentEmail] = useState("")
//   const [result, setResult] = useState<ResultRow | null>(null)

//   // Dynamic tests & results
//   const [tests, setTests] = useState<TestMeta[]>([])
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Session state
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

//   // Gate: student session check
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   // Load posted tests from teacher
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         const posted = JSON.parse(raw) as any[]
//         const normalized: TestMeta[] = posted.map((t, idx) => ({
//           id: t.id ?? `test-${idx}`,
//           name: t.name,
//           duration: t.duration ?? "30m",
//           mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
//             id: q.id ?? `q${i}`,
//             q: q.question ?? q.q ?? "Untitled Question",
//             options: q.options ?? [],
//             answer: typeof q.correctIndex === "number" ? q.options[q.correctIndex] : q.answer ?? q.options[0] ?? "",
//           })),
//         }))
//         setTests(normalized)
//       } catch {
//         setTests([])
//       }
//     }
//   }, [])

//   // Load previous student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Persist results
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   // Calculate MCQ score
//   const mcqScore = useMemo(() => {
//     if (!submitted || !selectedTest) return 0
//     return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
//   }, [answers, submitted, selectedTest])

//   // Start test
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//     setStudentName("")
//     setStudentEmail("")
//   }

//   // Submit test
//   const submitTest = () => {
//     if (!selectedTest || !studentName.trim() || !studentEmail.trim()) return
//     const subjective = 14 // placeholder
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest.id}-${Date.now()}`,
//       testId: selectedTest.id,
//       studentName,
//       studentEmail,
//       testName: selectedTest.name,
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//   }

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
//             <Button variant={active === "dashboard" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
//               Dashboard
//             </Button>
//             <Button variant={active === "give-test" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
//               Give Test
//             </Button>
//             <Button variant={active === "results" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("results")}>
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main Panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {tests.length === 0 ? (
//                   <p className="text-muted-foreground">No tests available yet.</p>
//                 ) : (
//                   tests.map((t) => (
//                     <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//               <p className="text-muted-foreground">Enter your details and answer the MCQs below.</p>

//               {/* Name & Email */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardContent className="grid gap-4 md:grid-cols-2">
//                   <div>
//                     <Label>Name</Label>
//                     <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Your Full Name" />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="your@email.com" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* MCQs */}
//               {selectedTest.mcqs.map((q) => (
//                 <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                   <CardHeader>
//                     <CardTitle className="text-base">{q.q}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <RadioGroup value={answers[q.id] ?? ""} onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))} className="grid gap-3">
//                       {q.options.map((op, idx) => (
//                         <div key={idx} className="flex items-center gap-3">
//                           <RadioGroupItem id={`${q.id}-${idx}`} value={op} />
//                           <Label htmlFor={`${q.id}-${idx}`}>{op}</Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex justify-end">
//                 <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
//                   Submit
//                 </Button>
//               </div>

//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>MCQ Score</CardTitle>
//                         <CardDescription>{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>AI Evaluated Subjective</CardTitle>
//                         <CardDescription>{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>Total Marks</CardTitle>
//                         <CardDescription>{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle>{r.testName}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         Name: {r.studentName} • Email: {r.studentEmail} <br />
//                         MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }

































// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// // Types
// type MCQ = {
//   id: string
//   q: string
//   options: string[]
//   answer: string
// }

// type TestMeta = {
//   id: string
//   name: string
//   duration: string
//   mcqs: MCQ[]
// }

// type ResultRow = {
//   id: string
//   testId: string
//   studentName: string
//   studentEmail: string
//   testName: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function StudentDashboardPage() {
//   const router = useRouter()

//   // UI state
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [studentName, setStudentName] = useState("")
//   const [studentEmail, setStudentEmail] = useState("")
//   const [result, setResult] = useState<ResultRow | null>(null)

//   // Dynamic tests & results
//   const [tests, setTests] = useState<TestMeta[]>([])
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Session state
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

//   // Gate: student session check
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   // Load posted tests from teacher
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         const posted = JSON.parse(raw) as any[]
//         const normalized: TestMeta[] = posted.map((t, idx) => ({
//           id: t.id ?? `test-${idx}`,
//           name: t.name,
//           duration: t.duration ?? "30m",
//           mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
//             id: q.id ?? `q${i}`,
//             q: q.question ?? q.q ?? "Untitled Question",
//             options: q.options ?? [],
//             answer:
//               typeof q.correctIndex === "number"
//                 ? q.options[q.correctIndex]
//                 : q.answer ?? q.options[0] ?? "",
//           })),
//         }))
//         setTests(normalized)
//       } catch {
//         setTests([])
//       }
//     }
//   }, [])

//   // Load previous student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Persist results
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   // Calculate MCQ score
//   const mcqScore = useMemo(() => {
//     if (!submitted || !selectedTest) return 0
//     return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
//   }, [answers, submitted, selectedTest])

//   // Start test
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//     setStudentName("")
//     setStudentEmail("")
//   }

//   // Submit test
//   const submitTest = () => {
//     if (!selectedTest || !studentName.trim() || !studentEmail.trim()) return
//     const subjective = 14 // placeholder
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest.id}-${Date.now()}`,
//       testId: selectedTest.id,
//       studentName,
//       studentEmail,
//       testName: selectedTest.name,
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//   }

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
//             <Button
//               variant={active === "dashboard" ? "default" : "ghost"}
//               className="w-full justify-start rounded-xl"
//               onClick={() => setActive("dashboard")}
//             >
//               Dashboard
//             </Button>
//             <Button
//               variant={active === "give-test" ? "default" : "ghost"}
//               className="w-full justify-start rounded-xl"
//               onClick={() => setActive("give-test")}
//             >
//               Give Test
//             </Button>
//             <Button
//               variant={active === "results" ? "default" : "ghost"}
//               className="w-full justify-start rounded-xl"
//               onClick={() => setActive("results")}
//             >
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main Panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {tests.length === 0 ? (
//                   <p className="text-muted-foreground">No tests available yet.</p>
//                 ) : (
//                   tests.map((t) => (
//                     <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button
//                           className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                           onClick={() => handleAttempt(t)}
//                         >
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//               <p className="text-muted-foreground">Enter your details and answer the MCQs below.</p>

//               {/* Name & Email */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardContent className="grid gap-4 md:grid-cols-2">
//                   <div>
//                     <Label>Name</Label>
//                     <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Your Full Name" />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="your@email.com" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* MCQs */}
//               {selectedTest.mcqs.map((q) => (
//                 <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                   <CardHeader>
//                     <CardTitle className="text-base">{q.q}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <RadioGroup
//                       value={answers[q.id] ?? ""}
//                       onValueChange={(val) => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
//                       className="grid gap-3"
//                     >
//                       {q.options.map((op, idx) => (
//                         <div key={`${q.id}-option-${idx}`} className="flex items-center gap-3">
//                           <RadioGroupItem id={`${q.id}-option-${idx}`} value={op} />
//                           <Label htmlFor={`${q.id}-option-${idx}`} className="cursor-pointer">
//                             {op}
//                           </Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex justify-end">
//                 <Button
//                   className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground"
//                   onClick={submitTest}
//                 >
//                   Submit
//                 </Button>
//               </div>

//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>MCQ Score</CardTitle>
//                         <CardDescription>
//                           {result.mcqScore} / {selectedTest.mcqs.length}
//                         </CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>AI Evaluated Subjective</CardTitle>
//                         <CardDescription>{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>Total Marks</CardTitle>
//                         <CardDescription>
//                           {result.total} / {selectedTest.mcqs.length + 20}
//                         </CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle>{r.testName}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         Name: {r.studentName} • Email: {r.studentEmail} <br />
//                         MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }

























// "use client"

// import { useEffect, useMemo, useState } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Input } from "@/components/ui/input"

// // Types
// type MCQ = {
//   id: string
//   q: string
//   options: string[]
//   answer: string
// }

// type TestMeta = {
//   id: string
//   name: string
//   duration: string
//   mcqs: MCQ[]
// }

// type ResultRow = {
//   id: string
//   testId: string
//   studentName: string
//   studentEmail: string
//   testName: string
//   date: string
//   mcqScore: number
//   subjectiveScore: number
//   total: number
// }

// export default function StudentDashboardPage() {
//   const router = useRouter()

//   // UI state
//   const [active, setActive] = useState<"dashboard" | "give-test" | "results">("dashboard")
//   const [selectedTest, setSelectedTest] = useState<TestMeta | null>(null)
//   const [answers, setAnswers] = useState<Record<string, string>>({})
//   const [upload, setUpload] = useState<File | null>(null)
//   const [submitted, setSubmitted] = useState(false)
//   const [studentName, setStudentName] = useState("")
//   const [studentEmail, setStudentEmail] = useState("")
//   const [result, setResult] = useState<ResultRow | null>(null)

//   // Dynamic tests & results
//   const [tests, setTests] = useState<TestMeta[]>([])
//   const [history, setHistory] = useState<ResultRow[]>([])

//   // Session state
//   const [loggedIn, setLoggedIn] = useState<boolean | null>(null)

//   // Gate: student session check
//   useEffect(() => {
//     const flag = localStorage.getItem("evalify_student_logged_in") === "true"
//     setLoggedIn(flag)
//   }, [])

//   // Load posted tests from teacher
//   useEffect(() => {
//     const raw = localStorage.getItem("teacher_tests")
//     if (raw) {
//       try {
//         const posted = JSON.parse(raw) as any[]
//         const normalized: TestMeta[] = posted.map((t, idx) => ({
//           id: t.id ?? `test-${idx}`,
//           name: t.name,
//           duration: t.duration ?? "30m",
//           mcqs: (t.mcqs ?? []).map((q: any, i: number) => ({
//             id: q.id ?? `q${i}`,
//             q: q.question ?? q.q ?? "Untitled Question",
//             options: q.options ?? [],
//             answer: typeof q.correctIndex === "number" ? q.options[q.correctIndex] : q.answer ?? q.options[0] ?? "",
//           })),
//         }))
//         setTests(normalized)
//       } catch {
//         setTests([])
//       }
//     }
//   }, [])

//   // Load previous student results
//   useEffect(() => {
//     const raw = localStorage.getItem("evalify_results")
//     if (raw) {
//       try {
//         setHistory(JSON.parse(raw))
//       } catch {}
//     }
//   }, [])

//   // Persist results
//   useEffect(() => {
//     localStorage.setItem("evalify_results", JSON.stringify(history))
//   }, [history])

//   // Calculate MCQ score
//   const mcqScore = useMemo(() => {
//     if (!submitted || !selectedTest) return 0
//     return selectedTest.mcqs.reduce((acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc), 0)
//   }, [answers, submitted, selectedTest])

//   // Start test
//   const handleAttempt = (test: TestMeta) => {
//     setSelectedTest(test)
//     setActive("give-test")
//     setAnswers({})
//     setUpload(null)
//     setSubmitted(false)
//     setResult(null)
//     setStudentName("")
//     setStudentEmail("")
//   }

//   // Submit test
//   const submitTest = () => {
//     if (!selectedTest || !studentName.trim() || !studentEmail.trim()) return
//     const subjective = 14 // placeholder
//     const total = mcqScore + subjective
//     const row: ResultRow = {
//       id: `${selectedTest.id}-${Date.now()}`,
//       testId: selectedTest.id,
//       studentName,
//       studentEmail,
//       testName: selectedTest.name,
//       date: new Date().toLocaleString(),
//       mcqScore,
//       subjectiveScore: subjective,
//       total,
//     }
//     setResult(row)
//     setHistory((prev) => [row, ...prev])
//     setSubmitted(true)
//   }

//   // Logout
//   const logout = () => {
//     localStorage.removeItem("evalify_student_logged_in")
//     router.push("/student/login")
//   }

//   if (loggedIn === false) {
//     return (
//       <main className="mx-auto max-w-3xl px-4 md:px-6 py-14">
//         <Card className="rounded-2xl">
//           <CardHeader>
//             <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//               Student Portal
//             </CardTitle>
//             <CardDescription className="text-muted-foreground">Please sign in to continue.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Link href="/student/login">
//               <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground">
//                 Go to Login
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       </main>
//     )
//   }

//   return (
//     <main className="mx-auto max-w-6xl px-4 md:px-6 py-6 md:py-10">
//       <div className="grid md:grid-cols-[220px_1fr] gap-6">
//         {/* Sidebar */}
//         <aside className="hidden md:block">
//           <nav className="rounded-2xl border border-border bg-card/60 p-2 space-y-1">
//             <Button variant={active === "dashboard" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("dashboard")}>
//               Dashboard
//             </Button>
//             <Button variant={active === "give-test" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("give-test")}>
//               Give Test
//             </Button>
//             <Button variant={active === "results" ? "default" : "ghost"} className="w-full justify-start rounded-xl" onClick={() => setActive("results")}>
//               My Results
//             </Button>
//             <Button variant="ghost" className="w-full justify-start rounded-xl" onClick={logout}>
//               Logout
//             </Button>
//           </nav>
//         </aside>

//         {/* Main Panel */}
//         <section>
//           {/* Dashboard */}
//           {active === "dashboard" && (
//             <div className="space-y-6">
//               <h1 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)]">
//                 Welcome back
//               </h1>
//               <p className="text-muted-foreground">Start with an available test or review your previous results.</p>

//               <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//                 {tests.length === 0 ? (
//                   <p className="text-muted-foreground">No tests available yet.</p>
//                 ) : (
//                   tests.map((t) => (
//                     <Card key={t.id} className="rounded-2xl border-border bg-card/80 shadow-sm hover:shadow-md">
//                       <CardHeader>
//                         <CardTitle className="text-base">{t.name}</CardTitle>
//                         <CardDescription className="text-muted-foreground">Duration: {t.duration}</CardDescription>
//                       </CardHeader>
//                       <CardContent>
//                         <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={() => handleAttempt(t)}>
//                           Attempt Now
//                         </Button>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Give Test */}
//           {active === "give-test" && selectedTest && (
//             <div className="space-y-6">
//               <h1 className="text-2xl font-semibold">{selectedTest.name}</h1>
//               <p className="text-muted-foreground">Enter your details and answer the MCQs below.</p>

//               {/* Name & Email */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardContent className="grid gap-4 md:grid-cols-2">
//                   <div>
//                     <Label>Name</Label>
//                     <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Your Full Name" />
//                   </div>
//                   <div>
//                     <Label>Email</Label>
//                     <Input value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} placeholder="your@email.com" />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* MCQs */}
//               {selectedTest.mcqs.map((q) => (
//                 <Card key={q.id} className="rounded-2xl border-border bg-card/80">
//                   <CardHeader>
//                     <CardTitle className="text-base">{q.q}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {/* Each question has its own RadioGroup */}
//                     <RadioGroup
//                       value={answers[q.id] ?? ""}
//                       onValueChange={(val) => setAnswers(prev => ({ ...prev, [q.id]: val }))}
//                       className="grid gap-3"
//                     >
//                       {q.options.map((op, idx) => (
//                         <div key={idx} className="flex items-center gap-3">
//                           <RadioGroupItem id={`${q.id}-${idx}`} value={op} />
//                           <Label htmlFor={`${q.id}-${idx}`}>{op}</Label>
//                         </div>
//                       ))}
//                     </RadioGroup>
//                   </CardContent>
//                 </Card>
//               ))}

//               {/* Upload */}
//               <Card className="rounded-2xl border-border bg-card/80">
//                 <CardHeader>
//                   <CardTitle className="text-base">Upload handwritten answer</CardTitle>
//                   <CardDescription className="text-muted-foreground">Accepted types: JPG, PNG, PDF</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-3">
//                   <Input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => setUpload(e.target.files?.[0] ?? null)} />
//                   {upload && <p className="text-sm text-muted-foreground">Selected: {upload.name}</p>}
//                 </CardContent>
//               </Card>

//               <div className="flex justify-end">
//                 <Button className="rounded-xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-2)] text-primary-foreground" onClick={submitTest}>
//                   Submit
//                 </Button>
//               </div>

//               {submitted && result && (
//                 <div className="space-y-4">
//                   <h2 className="text-xl font-semibold">Evaluation Result</h2>
//                   <div className="grid gap-4 sm:grid-cols-3">
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>MCQ Score</CardTitle>
//                         <CardDescription>{result.mcqScore} / {selectedTest.mcqs.length}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>AI Evaluated Subjective</CardTitle>
//                         <CardDescription>{result.subjectiveScore} / 20</CardDescription>
//                       </CardHeader>
//                     </Card>
//                     <Card className="rounded-2xl">
//                       <CardHeader>
//                         <CardTitle>Total Marks</CardTitle>
//                         <CardDescription>{result.total} / {selectedTest.mcqs.length + 20}</CardDescription>
//                       </CardHeader>
//                     </Card>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Results */}
//           {active === "results" && (
//             <div className="space-y-4">
//               <h1 className="text-2xl font-semibold">My Results</h1>
//               {history.length === 0 ? (
//                 <p className="text-muted-foreground">No attempts yet.</p>
//               ) : (
//                 <div className="grid gap-3">
//                   {history.map((r) => (
//                     <Card key={r.id} className="rounded-2xl border-border bg-card/80">
//                       <CardHeader>
//                         <CardTitle>{r.testName}</CardTitle>
//                         <CardDescription className="text-muted-foreground">{r.date}</CardDescription>
//                       </CardHeader>
//                       <CardContent className="text-sm text-muted-foreground">
//                         Name: {r.studentName} • Email: {r.studentEmail} <br />
//                         MCQ: {r.mcqScore} • Subjective: {r.subjectiveScore} • Total: {r.total}
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   )
// }
