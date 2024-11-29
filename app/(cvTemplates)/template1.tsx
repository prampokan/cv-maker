import { Dot } from "lucide-react";

interface TemplateProps {
  id: string;
  name: string;
  jobField: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
  address: string;
  about: string;
  education: any[];
  workExperience: any[];
  relatedExperience: any[];
  certification: any[];
  award: any[];
  skills: any[];
}

export default function Template1({
  id,
  name,
  jobField,
  phone,
  email,
  linkedin,
  website,
  address,
  about,
  education,
  workExperience,
  relatedExperience,
  certification,
  award,
  skills,
}: TemplateProps) {
  return (
    <div className="p-5 font-noto text-xs" id={id}>
      <h1 className="text-center text-2xl uppercase font-semibold">{name}</h1>
      <h1 className="text-center text-lg capitalize font-medium">{jobField}</h1>
      <div className="flex flex-wrap justify-center mt-4">
        <p className="border-r border-black px-2 h-2 flex items-center">
          {phone}
        </p>
        <p className="border-r border-black px-2 h-2 flex items-center">
          {email}
        </p>
        <p className="border-r border-black px-2 h-2 flex items-center">
          {linkedin}
        </p>
        <p className="px-2 h-2 flex items-center">{website}</p>
      </div>
      <div className="text-center mt-2">{address}</div>
      <p className="mt-4 leading-normal">{about}</p>
      <div>
        {education[0].university && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black">
            Education
          </h1>
        )}
        {education.map((item, i) => (
          <div key={i} className="mt-2">
            <div className="flex justify-between">
              <p className="font-bold capitalize">{item.university}</p>
              <p className="font-bold capitalize">{item.location}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-zinc-600 italic">{item.degree}</p>
              {item.start && (
                <p className="text-zinc-600 italic">
                  {item.start && item.end
                    ? `${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(
                        new Date(item.start)
                      )} - ${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(new Date(item.end))}`
                    : "Invalid date"}
                </p>
              )}
            </div>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {workExperience[0].company && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black">
            Work Experience
          </h1>
        )}
        {workExperience.map((item, i) => (
          <div key={i} className="mt-2">
            <div className="flex justify-between">
              <p className="font-bold capitalize">{item.company}</p>
              <p className="font-bold capitalize">{item.location}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-zinc-600 italic">{item.jobField}</p>
              {item.start && (
                <p className="text-zinc-600 italic">
                  {item.start && item.end
                    ? `${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(
                        new Date(item.start)
                      )} - ${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(new Date(item.end))}`
                    : "Invalid date"}
                </p>
              )}
            </div>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {relatedExperience[0].company && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black">
            Related Experience
          </h1>
        )}
        {relatedExperience.map((item, i) => (
          <div key={i} className="mt-2">
            <div className="flex justify-between">
              <p className="font-bold capitalize">{item.company}</p>
              <p className="font-bold capitalize">{item.location}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-zinc-600 italic">{item.field}</p>
              {item.start && (
                <p className="text-zinc-600 italic">
                  {item.start && item.end
                    ? `${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(
                        new Date(item.start)
                      )} - ${new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                      }).format(new Date(item.end))}`
                    : "Invalid date"}
                </p>
              )}
            </div>
            <p className="mt-2">{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {certification[0].certificate && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black mb-2">
            Certification
          </h1>
        )}
        {certification &&
          certification.map((item, i) => (
            <div key={i}>
              <li className="">{item.certificate}</li>
            </div>
          ))}
      </div>
      <div>
        {award[0].award && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black mb-2">
            Award
          </h1>
        )}
        {award &&
          award.map((item, i) => (
            <div key={i}>
              <li className="">{item.award}</li>
            </div>
          ))}
      </div>
      <div>
        {skills[0].skill && (
          <h1 className="text-lg uppercase mt-5 w-full border-b border-black mb-2">
            Skills
          </h1>
        )}
        {skills &&
          skills.map((item, i) => (
            <div key={i} className="flex items-center">
              <p className="font-bold capitalize">{item.skill} :</p>
              <p className="ml-2">{item.detail}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
