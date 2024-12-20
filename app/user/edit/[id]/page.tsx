"use client";

import * as React from "react";
import { useState, useEffect, FormEvent, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { db, auth } from "@/lib/firebase/init";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";
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
  Pen,
  Download,
  Star,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useToast } from "@/components/hooks/use-toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

export default function Edit() {
  const [user, loading, error] = useAuthState(auth);
  const [templateName, setTemplateName] = useState("");
  const [name, setName] = useState("");
  const [jobField, setJobField] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState<any>([
    {
      university: "",
      degree: "",
      location: "",
      gpa: "",
      start: "",
      end: "",
      description: "",
    },
  ]);
  const [skills, setSkills] = useState<any>([{ skill: "", detail: "" }]);
  const [workExperience, setWorkExperience] = useState<any>([
    {
      company: "",
      jobField: "",
      location: "",
      start: "",
      end: "",
      description: "",
    },
  ]);
  const [relatedExperience, setRelatedExperience] = useState<any>([
    {
      company: "",
      field: "",
      location: "",
      start: "",
      end: "",
      description: "",
    },
  ]);
  const [certification, setCertification] = useState<any>([
    { certificate: "" },
  ]);
  const [award, setAward] = useState<any>([{ award: "" }]);
  const params = useParams();
  const id = params?.id as string;
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState("preview");
  const { toast } = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [review, setReview] = useState("");
  const [stars, setStars] = useState<number | undefined>(undefined);

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, 7));
  };

  const prevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  useEffect(() => {
    if (id) {
      setIsModalOpen(true);
      getOrder(id);
    }
  }, [id]);

  const getOrder = async (id: string) => {
    const docRef = doc(db, "orders", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTemplateName(data.templateName);
      setName(data.content.name);
      setJobField(data.content.jobField);
      setEmail(data.content.email);
      setPhone(data.content.phone);
      setLinkedin(data.content.linkedin);
      setWebsite(data.content.website);
      setAddress(data.content.address);
      setAbout(data.content.about);
      setEducation(
        data.content.education || [
          {
            university: "",
            degree: "",
            location: "",
            gpa: "",
            start: "",
            end: "",
            description: "",
          },
        ]
      );
      setWorkExperience(
        data.content.workExperience || [
          {
            company: "",
            jobField: "",
            location: "",
            start: "",
            end: "",
            description: "",
          },
        ]
      );
      setRelatedExperience(
        data.content.relatedExperience || [
          {
            company: "",
            field: "",
            location: "",
            start: "",
            end: "",
            description: "",
          },
        ]
      );
      setCertification(data.content.certification || [{ certificate: "" }]);
      setAward(data.content.award || [{ award: "" }]);
      setSkills(data.content.skills || [{ skill: "", detail: "" }]);
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
      setEducation([
        ...education,
        {
          university: "",
          degree: "",
          location: "",
          gpa: "",
          start: "",
          end: "",
          description: "",
        },
      ]);
    }
    if (formField === "work-experience") {
      setWorkExperience([
        ...workExperience,
        {
          company: "",
          jobField: "",
          location: "",
          start: "",
          end: "",
          description: "",
        },
      ]);
    }
    if (formField === "related-experience") {
      setRelatedExperience([
        ...relatedExperience,
        {
          company: "",
          field: "",
          location: "",
          start: "",
          end: "",
          description: "",
        },
      ]);
    }
    if (formField === "certification") {
      setCertification([...certification, { certificate: "" }]);
    }
    if (formField === "award") {
      setAward([...award, { award: "" }]);
    }
    if (formField === "skills") {
      setSkills([...skills, { skill: "", detail: "" }]);
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
        templateName: templateName,
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      toast({
        title: "CV Saved Successfully",
        description: "You can continue edit it later.",
      });
      setTimeout(() => {
        setIsModalReviewOpen(true);
      }, 1000);
    }
  };

  const DownloadPDF = async () => {
    const html2pdf = await require("html2pdf.js");
    const element = document.querySelector("#doc");
    html2pdf(element);
  };

  const deleteOrder = async () => {
    try {
      await deleteDoc(doc(db, "orders", id));
      toast({
        title: "CV Deleted",
        description: "CV Deleted Successfully",
      });
      router.push("/user");
    } catch (error) {
      console.error("error :", error);
    }
  };

  const addReview = async () => {
    try {
      await addDoc(collection(db, "reviews"), {
        name: user?.displayName,
        email: user?.email,
        profile_photo: user?.photoURL,
        review: review,
        stars: stars,
      });
    } catch (error) {
      console.error(error);
    } finally {
      toast({
        title: "Thank you for your review",
        description: "Your input helps us improve and serve you better! 🙌",
      });
    }
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

  const StarUI = [];
  for (let i = 1; i <= 5; i++) {
    StarUI.push(
      <div
        onClick={() => setStars(i)}
        className={`cursor-pointer hover:text-yellow-500 transition-all duration-200 ${
          stars && stars >= i ? "text-yellow-500" : "text-zinc-200"
        }`}
      >
        <Star size="30" />
      </div>
    );
  }

  return (
    <div className="flex w-full justify-center py-24 px-5 2xl:px-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-[90rem]">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/user">Home</BreadcrumbLink>
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">Education {index + 1}</Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>University</Label>
                    <Input
                      type="text"
                      placeholder="Universitas Diponegoro"
                      value={item.university}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "university",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Degree</Label>
                    <Input
                      type="text"
                      placeholder="Computer Engineering"
                      value={item.degree}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "degree",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>GPA</Label>
                    <Input
                      type="text"
                      placeholder="3.57"
                      value={item.gpa}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "gpa",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>University Location</Label>
                    <Input
                      type="text"
                      placeholder="Semarang, Indonesia"
                      value={item.location}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "location",
                          e.target.value,
                          "education"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <div className="flex flex-col 2xl:flex-row gap-2 items-start 2xl:items-center">
                      {/* Date Picker for Start Date */}
                      <div className="flex flex-col">
                        <Label>From</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.start && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.start ? (
                                format(new Date(item.start), "PPP")
                              ) : (
                                <span>Pick a Start Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.start ? new Date(item.start) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "start",
                                  date?.toISOString() || "",
                                  "education"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      {/* Date Picker for End Date */}
                      <div className="flex flex-col">
                        <Label>To</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.end && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.end && item.end !== "Present" ? (
                                format(new Date(item.end), "PPP")
                              ) : (
                                <span>Pick an End Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.end ? new Date(item.end) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "end",
                                  date?.toISOString() || "",
                                  "education"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        type="button"
                        className={`mt-[5px] w-full ${
                          item.end === "Present" ? "bg-zinc-100" : ""
                        }`}
                        variant="outline"
                        onClick={() =>
                          handleFormChange(index, "end", "Present", "education")
                        }
                      >
                        Present
                      </Button>
                    </div>
                    <Label>Description</Label>
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">
                      Work Experience {index + 1}
                    </Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>Company</Label>
                    <Input
                      type="text"
                      placeholder="Telkom Indonesia"
                      value={item.company}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "company",
                          e.target.value,
                          "work-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Job Field</Label>
                    <Input
                      type="text"
                      placeholder="Software Engineer"
                      value={item.jobField}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "jobField",
                          e.target.value,
                          "work-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Company Location</Label>
                    <Input
                      type="text"
                      placeholder="Semarang, Indonesia"
                      value={item.location}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "location",
                          e.target.value,
                          "work-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <div className="flex flex-col 2xl:flex-row gap-2 items-start 2xl:items-center">
                      {/* Date Picker for Start Date */}
                      <div className="flex flex-col">
                        <Label>From</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.start && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.start ? (
                                format(new Date(item.start), "PPP")
                              ) : (
                                <span>Pick a Start Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.start ? new Date(item.start) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "start",
                                  date?.toISOString() || "",
                                  "work-experience"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Date Picker for End Date */}
                      <div className="flex flex-col">
                        <Label>To</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.end && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.end && item.end !== "Present" ? (
                                format(new Date(item.end), "PPP")
                              ) : (
                                <span>Pick an End Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.end ? new Date(item.end) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "end",
                                  date?.toISOString() || "",
                                  "work-experience"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        type="button"
                        className={`mt-[5px] w-full ${
                          item.end === "Present" ? "bg-zinc-100" : ""
                        }`}
                        variant="outline"
                        onClick={() =>
                          handleFormChange(
                            index,
                            "end",
                            "Present",
                            "work-experience"
                          )
                        }
                      >
                        Present
                      </Button>
                    </div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="In Telkom Indonesia I..."
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">
                      Related Experience {index + 1}
                    </Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>Company</Label>
                    <Input
                      type="text"
                      placeholder="Bangkit Academy"
                      value={item.company}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "company",
                          e.target.value,
                          "related-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Field</Label>
                    <Input
                      type="text"
                      placeholder="Cloud Computing"
                      value={item.field}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "field",
                          e.target.value,
                          "related-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Company Location</Label>
                    <Input
                      type="text"
                      placeholder="Semarang, Indonesia"
                      value={item.location}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "location",
                          e.target.value,
                          "related-experience"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <div className="flex flex-col 2xl:flex-row gap-2 items-start 2xl:items-center">
                      {/* Date Picker for Start Date */}
                      <div className="flex flex-col">
                        <Label>From</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.start && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.start ? (
                                format(new Date(item.start), "PPP")
                              ) : (
                                <span>Pick a Start Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.start ? new Date(item.start) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "start",
                                  date?.toISOString() || "",
                                  "related-experience"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Date Picker for End Date */}
                      <div className="flex flex-col">
                        <Label>To</Label>
                        <Popover>
                          <PopoverTrigger asChild className="mb-3 mt-1">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !item.end && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon />
                              {item.end && item.end !== "Present" ? (
                                format(new Date(item.end), "PPP")
                              ) : (
                                <span>Pick an End Date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                item.end ? new Date(item.end) : undefined
                              }
                              onSelect={(date) =>
                                handleFormChange(
                                  index,
                                  "end",
                                  date?.toISOString() || "",
                                  "related-experience"
                                )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <Button
                        type="button"
                        className={`mt-[5px] w-full ${
                          item.end === "Present" ? "bg-zinc-100" : ""
                        }`}
                        variant="outline"
                        onClick={() =>
                          handleFormChange(
                            index,
                            "end",
                            "Present",
                            "related-experience"
                          )
                        }
                      >
                        Present
                      </Button>
                    </div>
                    <Label>Description</Label>
                    <Textarea
                      placeholder="In Bangkit Academy Indonesia I..."
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
                          onClick={() =>
                            removeMultiField(index, "related-experience")
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">
                      Certification {index + 1}
                    </Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>Certificate</Label>
                    <Input
                      type="text"
                      placeholder="Dicoding"
                      value={item.certificate}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "certificate",
                          e.target.value,
                          "certification"
                        )
                      }
                      className="mb-3 mt-1"
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">Award {index + 1}</Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>Award</Label>
                    <Input
                      type="text"
                      placeholder="Dicoding"
                      value={item.award}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "award",
                          e.target.value,
                          "award"
                        )
                      }
                      className="mb-3 mt-1"
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
                  <div className="flex justify-between items-center">
                    <Label className="font-bold">Award {index + 1}</Label>
                  </div>
                  <div key={index} className="mb-5 mt-4">
                    <Label>Skill</Label>
                    <Input
                      type="text"
                      placeholder="Web Developing"
                      value={item.skill}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "skill",
                          e.target.value,
                          "skills"
                        )
                      }
                      className="mb-3 mt-1"
                    />
                    <Label>Detail</Label>
                    <Textarea
                      placeholder="Skill detail"
                      value={item.detail}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "detail",
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
                Add More Skills
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
                <Button
                  onClick={async (e) => {
                    await updateOrder(e);
                    DownloadPDF();
                  }}
                >
                  Save CV
                </Button>
                <AlertDialog
                  open={isModalReviewOpen}
                  onOpenChange={setIsModalReviewOpen}
                >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="mb-1">
                        ⭐ Give Us a Review!
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <Label>Stars</Label>
                        <div className="flex mb-4 mt-2">{StarUI}</div>
                        <Label>Review</Label>
                        <Textarea
                          placeholder="This is the best CV Maker I've ever tried!"
                          value={review}
                          onChange={(e) => setReview(e.target.value)}
                          className="mt-2"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Close</AlertDialogCancel>
                      <AlertDialogAction onClick={addReview}>
                        Done
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          </div>
        </div>

        {/* CV Preview */}
        <div>
          <div className="mb-5 mt-11 flex flex-col sm:flex-row justify-between gap-2">
            <div>
              <Button
                className="xl:rounded-r-none"
                variant={preview == "preview" ? "secondary" : "ghost"}
                onClick={() => setPreview("preview")}
              >
                Preview
              </Button>
              <Button
                className="xl:rounded-l-none"
                variant={preview == "example" ? "secondary" : "ghost"}
                onClick={() => setPreview("example")}
              >
                Example
              </Button>
            </div>
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Pen />
                  {templateName}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit CV Name.</AlertDialogTitle>
                  <AlertDialogDescription>
                    <Label>CV Name</Label>
                    <Input
                      type="text"
                      placeholder="Template 1"
                      value={templateName}
                      onChange={(e) => setTemplateName(e.target.value)}
                      className="mt-2"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Close</AlertDialogCancel>
                  <AlertDialogAction onClick={updateOrder}>
                    Done
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <div className="flex gap-2">
              <Button onClick={DownloadPDF} className="w-full">
                <Download />
                Download PDF
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete CV</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure to delete your CV?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteOrder}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <div className="overflow-auto w-full h-[63rem] border rounded shadow-xl">
            <div className="w-[45rem] h-[63rem]">
              {preview === "preview" ? (
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
              ) : (
                <Image
                  src="/template1.png"
                  alt="example"
                  width={3000}
                  height={3000}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
