"use client";

import { useState, useEffect, FormEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase/init";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import Template1 from "@/app/(cvTemplates)/template1";
import {
  CopyPlus,
  Trash2,
  CircleUser,
  BookText,
  BriefcaseBusiness,
  GraduationCap,
  FileBadge2,
  Award,
  Brain,
  ChevronLeft,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Edit() {
  const [name, setName] = useState("");
  const [jobField, setJobField] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState<any>([
    { name: "", description: "" },
  ]);
  const [skills, setSkills] = useState<any>([{ name: "", description: "" }]);
  const [workExperience, setWorkExperience] = useState<any>([
    { name: "", description: "" },
  ]);
  const [relatedExperience, setRelatedExperience] = useState<any>([
    { name: "", description: "" },
  ]);
  const [certification, setCertification] = useState<any>([
    { name: "", description: "" },
  ]);
  const [award, setAward] = useState<any>([{ name: "", description: "" }]);
  const params = useParams();
  const id = params?.id as string;
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 7));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  useEffect(() => {
    if (id) {
      getOrder(id);
    }
  }, [id]);

  const getOrder = async (id: string) => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setName(data.content.name);
      setJobField(data.content.jobField);
      setEmail(data.content.email);
      setPhone(data.content.phone);
      setLinkedin(data.content.linkedin);
      setWebsite(data.content.website);
      setAddress(data.content.address);
      setAbout(data.content.about);
      setEducation(data.content.education || [{ name: "", description: "" }]);
      setWorkExperience(
        data.content.workExperience || [{ name: "", description: "" }]
      );
      setRelatedExperience(
        data.content.relatedExperience || [{ name: "", description: "" }]
      );
      setCertification(
        data.content.certification || [{ name: "", description: "" }]
      );
      setAward(data.content.award || [{ name: "", description: "" }]);
      setSkills(data.content.skills || [{ name: "", description: "" }]);
    } else {
      console.log("No such document!");
    }
  };

  const handleFormChange = (
    index: any,
    field: any,
    value: any,
    formField: string
  ) => {
    if (formField === "education") {
      const updatedEducation = [...education];
      updatedEducation[index][field] = value;
      setEducation(updatedEducation);
    }
    if (formField === "work-experience") {
      const updatedWorkExperience = [...workExperience];
      updatedWorkExperience[index][field] = value;
      setWorkExperience(updatedWorkExperience);
    }
    if (formField === "related-experience") {
      const updatedRelatedExperience = [...relatedExperience];
      updatedRelatedExperience[index][field] = value;
      setRelatedExperience(updatedRelatedExperience);
    }
    if (formField === "certification") {
      const updatedCertification = [...certification];
      updatedCertification[index][field] = value;
      setCertification(updatedCertification);
    }
    if (formField === "award") {
      const updatedAward = [...award];
      updatedAward[index][field] = value;
      setAward(updatedAward);
    }
    if (formField === "skills") {
      const updatedSkills = [...skills];
      updatedSkills[index][field] = value;
      setSkills(updatedSkills);
    }
  };

  const addMultiField = (e: FormEvent, formField: string) => {
    e.preventDefault();
    if (formField === "education") {
      setEducation([...education, { name: "", description: "" }]);
    }
    if (formField === "work-experience") {
      setWorkExperience([...workExperience, { name: "", description: "" }]);
    }
    if (formField === "related-experience") {
      setRelatedExperience([
        ...relatedExperience,
        { name: "", description: "" },
      ]);
    }
    if (formField === "certification") {
      setCertification([...certification, { name: "", description: "" }]);
    }
    if (formField === "award") {
      setAward([...award, { name: "", description: "" }]);
    }
    if (formField === "skills") {
      setSkills([...skills, { name: "", description: "" }]);
    }
  };

  const removeMultiField = (index: any, formField: string) => {
    if (formField === "education") {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);
      setEducation(updatedEducation);
    }
    if (formField === "work-experience") {
      const updatedWorkExperience = [...workExperience];
      updatedWorkExperience.splice(index, 1);
      setWorkExperience(updatedWorkExperience);
    }
    if (formField === "related-experience") {
      const updatedRelatedExperience = [...relatedExperience];
      updatedRelatedExperience.splice(index, 1);
      setRelatedExperience(updatedRelatedExperience);
    }
    if (formField === "certification") {
      const updatedCertification = [...certification];
      updatedCertification.splice(index, 1);
      setCertification(updatedCertification);
    }
    if (formField === "award") {
      const updatedAward = [...award];
      updatedAward.splice(index, 1);
      setAward(updatedAward);
    }
    if (formField === "skills") {
      const updatedSkils = [...skills];
      updatedSkils.splice(index, 1);
      setSkills(updatedSkils);
    }
  };

  const updateOrder = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "orders", id), {
        content: {
          name: name,
          jobField: jobField,
          phone: phone,
          email: email,
          linkedin: linkedin,
          website: website,
          address: address,
          about: about,
          education: education,
          workExperience: workExperience,
          relatedExperience: relatedExperience,
          certification: certification,
          award: award,
          skills: skills,
        },
        updatedAt: new Date(),
      });
      DownloadPDF();
    } catch (error) {
      console.error(error);
    }
  };

  const DownloadPDF = async () => {
    const html2pdf = await require("html2pdf.js");
    const element = document.querySelector("#doc");
    html2pdf(element);
  };

  const FormProgress = [
    {
      id: 1,
      name: "Personal Information",
      icon: <CircleUser size={16} />,
    },
    {
      id: 2,
      name: "Education",
      icon: <GraduationCap size={16} />,
    },
    {
      id: 3,
      name: "Work Experience",
      icon: <BriefcaseBusiness size={16} />,
    },
    {
      id: 4,
      name: "Related Experience",
      icon: <BookText size={16} />,
    },
    {
      id: 5,
      name: "Certification",
      icon: <FileBadge2 size={16} />,
    },
    {
      id: 6,
      name: "Award",
      icon: <Award size={16} />,
    },
    {
      id: 7,
      name: "Skills",
      icon: <Brain size={16} />,
    },
  ];

  return (
    <div className="flex w-full justify-center py-24 px-5 2xl:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[90rem]">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/user">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid grid-cols-7 mb-5 mt-7">
            {FormProgress.map((item) => (
              <div
                key={item.id}
                className={`${
                  step >= item.id
                    ? "border-blue-500 text-blue-500"
                    : "text-zinc-500"
                } text-center border-b-2 pb-2 text-xs font-medium flex items-center flex-col gap-1`}
              >
                {item.icon}
                <span className="hidden sm:block">{item.name}</span>
              </div>
            ))}
          </div>
          {step === 1 && (
            <form>
              <Label>Full Name</Label>
              <Input
                type="text"
                placeholder="Pramudya Diagusta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Job Field</Label>
              <Input
                type="text"
                placeholder="Software Engineer"
                value={jobField}
                onChange={(e) => setJobField(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Phone</Label>
              <Input
                type="text"
                placeholder="081234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="prampokan@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Linkedin</Label>
              <Input
                type="text"
                placeholder="linkedin.com/pramudyadiagusta"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Website</Label>
              <Input
                type="text"
                placeholder="www.prampokan.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>Address</Label>
              <Textarea
                placeholder="Semarang, Indonesia."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mb-3 mt-1"
              />
              <Label>About</Label>
              <Textarea
                placeholder="I am a passionate developer..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="mb-3 mt-1"
              />
            </form>
          )}

          {step === 2 && (
            <form>
              {education.map((item: any, index: any) => (
                <>
                  <Label>Education {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Universitas Indonesia"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "name",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: In Universitas Indonesia what do I do..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "education"
                        )
                      }
                    />
                    {education.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() => removeMultiField(index, "education")}
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "education")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Education
              </Button>
            </form>
          )}

          {step === 3 && (
            <form>
              {workExperience.map((item: any, index: any) => (
                <>
                  <Label>Work Experience {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Netflix"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "name",
                          e.target.value,
                          "work-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: Frontend Next js React js..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "work-experience"
                        )
                      }
                    />
                    {workExperience.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() =>
                            removeMultiField(index, "work-experience")
                          }
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "work-experience")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Work Experience
              </Button>
            </form>
          )}

          {step === 4 && (
            <form>
              {relatedExperience.map((item: any, index: any) => (
                <>
                  <Label>Related Experience {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Web Developing"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "name",
                          e.target.value,
                          "related-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: Frontend Next js React js..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "related-experience"
                        )
                      }
                    />
                    {relatedExperience.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() => removeMultiField(index, "skills")}
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "related-experience")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Related Experience
              </Button>
            </form>
          )}

          {step === 5 && (
            <form>
              {certification.map((item: any, index: any) => (
                <>
                  <Label>Certification {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Web Developing"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "name",
                          e.target.value,
                          "certification"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: Frontend Next js React js..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "certification"
                        )
                      }
                    />
                    {certification.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() =>
                            removeMultiField(index, "certification")
                          }
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "certification")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Certification
              </Button>
            </form>
          )}

          {step === 6 && (
            <form>
              {award.map((item: any, index: any) => (
                <>
                  <Label>Award {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Web Developing"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(index, "name", e.target.value, "award")
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: Frontend Next js React js..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "award"
                        )
                      }
                    />
                    {award.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() => removeMultiField(index, "award")}
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "award")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Award
              </Button>
            </form>
          )}

          {step === 7 && (
            <form>
              {skills.map((item: any, index: any) => (
                <>
                  <Label>Skills {index + 1}</Label>
                  <div
                    key={index}
                    className="bg-zinc-100 border rounded p-2 mb-5 mt-1"
                  >
                    <Input
                      type="text"
                      placeholder="contoh: Web Developing"
                      value={item.name}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "name",
                          e.target.value,
                          "skills"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Textarea
                      placeholder="contoh: Frontend Next js React js..."
                      value={item.description}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "description",
                          e.target.value,
                          "skills"
                        )
                      }
                    />
                    {skills.length > 1 && (
                      <div className="w-full flex justify-end">
                        <Button
                          onClick={() => removeMultiField(index, "skills")}
                          className="h-8 mt-2 gap-1 text-zinc-500 hover:text-red-500"
                          variant="ghost"
                        >
                          <Trash2 />
                          Remove
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              ))}
              <Button
                onClick={(e) => addMultiField(e, "skills")}
                className="w-full"
                variant="ghost"
              >
                <CopyPlus />
                Add More Award
              </Button>
            </form>
          )}

          <div className="w-full flex justify-end mt-4">
            {step > 1 && (
              <Button onClick={prevStep} className="mr-2" variant="secondary">
                Back
              </Button>
            )}
            {step < 7 ? (
              <Button onClick={nextStep}>Next</Button>
            ) : (
              <>
                <Button onClick={updateOrder}>Save CV!</Button>
              </>
            )}
          </div>
        </div>

        {/* CV Preview */}
        <div className="overflow-auto w-full h-[63rem] border rounded shadow-xl">
          <div className="w-[45rem] h-[63rem]">
            <Template1
              id="doc"
              name={name}
              jobField={jobField}
              phone={phone}
              email={email}
              linkedin={linkedin}
              website={website}
              address={address}
              about={about}
              education={education}
              workExperience={workExperience}
              relatedExperience={relatedExperience}
              certification={certification}
              award={award}
              skills={skills}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
