import { useEffect, useState } from "react";

const SECTIONS = [
  {
    id: "personal-details",
    label: "Personal Details",
  },
  {
    id: "citizenship-details",
    label: "Citizenship Details",
  },
  {
    id: "address-details",
    label: "Address Details",
  },
  {
    id: "contact-details",
    label: "Contact Details",
  },
  {
    id: "appointment-details",
    label: "Appointment Details",
  },
  {
    id: "previous-passport",
    label: "Previous Passport",
  },
  {
    id: "supporting-documents",
    label: "Supporting Documents",
  },
  {
    id: "proxy-details",
    label: "Proxy / Guardian",
  },
];

export default function DetailSectionNav() {
  const [activeSection, setActiveSection] = useState("personal-details");

  useEffect(() => {
    const container = document.getElementById("user-details-content");

    if (!container) return;

    const handleScroll = () => {
      const sections = SECTIONS.map((section) =>
        document.getElementById(section.id),
      ).filter(Boolean);

      const scrollPosition = container.scrollTop + 120;

      let current = SECTIONS[0].id;

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPosition) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    const container = document.getElementById("user-details-content");

    const section = document.getElementById(id);

    if (!container || !section) return;

    container.scrollTo({
      top: section.offsetTop - 24,
      behavior: "smooth",
    });

    setActiveSection(id);
  };

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-slate-50 p-3">
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        User Information
      </p>

      <nav className="space-y-1">
        {SECTIONS.map((section) => {
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                active
                  ? "bg-[#eaf2fb] text-[#2F5F98]"
                  : "text-slate-600 hover:bg-white hover:text-[#2F5F98]"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
