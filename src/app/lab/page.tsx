import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { DataLab } from "@/components/lab/DataLab";

export const metadata: Metadata = {
  title: "Data Lab",
  description:
    "An interactive look at how I explore data — metrics over time, acquisition mix, and the read I'd give a stakeholder.",
};

export default function LabPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        eyebrow="Data Lab"
        title="Numbers, made legible"
        description="A small interactive showcase of how I work with data: switch metrics, hover the chart, and read the kind of plain-language interpretation I'd hand a stakeholder. The figures here are illustrative."
      />
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <DataLab />
        </Reveal>
      </section>
    </div>
  );
}
