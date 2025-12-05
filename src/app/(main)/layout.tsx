import Footer from "@/components/footer";
import Messenger from "@/components/messenger";
import NavigationBar from "@/components/navigation-bar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Messenger />
      <NavigationBar />
      <main className="mx-auto max-w-4xl w-full px-4 py-16">{children}</main>
      <Footer />
    </>
  );
}
