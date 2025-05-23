'use client";';
import { useState } from "react";
import { ExperienceCard } from "./experience-card";
import { HospitalityExperience, Project } from "@/types/hospitality";
import { ProjectModal } from "./project-modal";

interface ExperienceGridProps {
  experiences: HospitalityExperience[];
  viewMode: "grid" | "list";
}

const ExperineceGrid = ({ experiences, viewMode }: ExperienceGridProps) => {
  const [selectedProjcet, setSelectedProject] = useState<{
    project: Project;
    experience: HospitalityExperience;
  } | null>(null);

  const handleProjectClick = (
    project: Project,
    experience: HospitalityExperience
  ) => {
    setSelectedProject({ project, experience });
  };

  const handleCloseModel = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="w-full">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onProjectClick={(project: Project) =>
                  handleProjectClick(project, experience)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {experiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onProjectClick={(project: Project) =>
                  handleProjectClick(project, experience)
                }
              />
            ))}
          </div>
        )}

        {selectedProjcet && (
          <ProjectModal
            project={selectedProjcet.project}
            experience={selectedProjcet.experience}
            onClose={handleCloseModel}
          />
        )}
      </div>
    </>
  );
};

export default ExperineceGrid;
