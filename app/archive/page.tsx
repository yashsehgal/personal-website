import { ArchiveHeaderSection } from "@/modules/archive-page/archive-header-section";
import { ArchiveLinksSection } from "@/modules/archive-page/archive-links-section";

export default function Archive() {
  return (
    <div>
      <div className="mt-20 mb-18">
        <ArchiveHeaderSection />
      </div>
      <div className="flex flex-col gap-6">
        <div className="h-px w-full bg-muted" />
        <ArchiveLinksSection />
      </div>
    </div>
  );
}
