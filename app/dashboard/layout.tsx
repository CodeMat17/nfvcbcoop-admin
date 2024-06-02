import { ModeToggle } from "@/components/ModeToggle";
import Nav from "@/components/Nav";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='flex'>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Nav />

      <main className='w-full px-4'>
     
        <section className='p-4 min-h-screen sm:ml-44 lg:ml-64 justify-end bg-gray-100 dark:bg-gray-800 rounded-xl'>
          {children}
        </section>
      </main>
    </section>
  );
}
