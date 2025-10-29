export default function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-slate-100 text-center text-slate-500 text-sm">
      <p>© {new Date().getFullYear()} HealthMe. Your Health, Made Simple.</p>
    </footer>
  );
}