import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>header</div>
      {children}
      <div>footer</div>
    </div>
  );
}
