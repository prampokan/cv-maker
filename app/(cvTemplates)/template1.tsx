interface Field {
  name: string;
  description: string;
}

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
  education: Field[];
  workExperience: Field[];
  relatedExperience: Field[];
  certification: Field[];
  award: Field[];
  skills: Field[];
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
    <div className="p-10 font-noto text-xs" id={id}>
      <h1 className="text-center text-2xl uppercase font-semibold">{name}</h1>
      <h1 className="text-center text-lg capitalize font-medium">{jobField}</h1>
      <div className="flex flex-wrap justify-center mt-4">
        <p className="border-r border-black px-2">{phone}</p>
        <p className="border-r border-black px-2">{email}</p>
        <p className="border-r border-black px-2">{linkedin}</p>
        <p className="px-2">{website}</p>
      </div>
      <div className="text-center mt-1">{address}</div>
      <p className="mt-4">{about}</p>
      <div>
        {education[0].name && (
          <h1 className="text-xl uppercase mt-5">Education</h1>
        )}
        {education.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {workExperience[0].name && (
          <h1 className="text-xl uppercase mt-5">Work Experience</h1>
        )}
        {workExperience.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {relatedExperience[0].name && (
          <h1 className="text-xl uppercase mt-5">Related Experience</h1>
        )}
        {relatedExperience.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {certification[0].name && (
          <h1 className="text-xl uppercase mt-5">Certification</h1>
        )}
        {certification.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {award[0].name && <h1 className="text-xl uppercase mt-5">Award</h1>}
        {award.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <div>
        {skills[0].name && <h1 className="text-xl uppercase mt-5">Skills</h1>}
        {skills.map((item, i) => (
          <div key={i}>
            <p className="font-bold capitalize">{item.name}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
