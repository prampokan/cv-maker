interface Field {
  name: string;
  description: string;
}

interface TemplateProps {
  name: string;
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
  name,
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
    <div className="p-10">
      <h1 className="text-center text-2xl uppercase">Pramudya Diagusta</h1>
      <div className="flex text-sm gap-2 justify-center">
        <p>08123456789</p>
        <p>prampokan@gmail.com</p>
        <p>linkeding.com/asdasdasd</p>
        <p>www.prampokan.com</p>
      </div>
      <div className="text-center text-sm">Semarang, Indonesia</div>
    </div>
  );
}
