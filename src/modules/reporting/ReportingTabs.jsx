import { Container } from "@/src/common/components/container";
import { Hero } from "@/src/common/components/Hero";
import { HeroTitle } from "@/src/common/components/HeroTitle";
import { TabNav } from "@/src/common/components/tabnav";

const headers = [
  {
    name: "active",
    href: "/reporting/active",
    displayAs: "Active",
  },
  {
    name: "resolved",
    href: "/reporting/resolved",
    displayAs: "Resolved",
  },
];

export const ReportingTabs = ({ active, children }) => {
  return (
    <>
      <Hero>
        <Container className="px-2 py-20">
          <HeroTitle>Reporting</HeroTitle>
        </Container>

        <TabNav headers={headers} activeTab={active} />
      </Hero>

      {children}
    </>
  );
};
