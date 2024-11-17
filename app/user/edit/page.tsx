"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Template1 from "@/app/(cvTemplates)/template1";

export default function Edit() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");

  return (
    <div className="flex w-full justify-center py-24">
      <div className="grid grid-cols-2 gap-4 w-[90rem]">
        <div className="pr-4">
          <form>
            <Label>Nama Lengkap</Label>
            <Input
              type="text"
              placeholder="contoh: Pramudya Diagusta"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-3 mt-1"
            />
            <Label>About</Label>
            <Textarea
              placeholder="contoh: i am a bla bla bla..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="mb-3 mt-1"
            />
            <Label>Education</Label>
            <Textarea
              placeholder="contoh: Universitas Indonesia"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              className="mb-3 mt-1"
            />
            <Label>Skills</Label>
            <Textarea
              placeholder="contoh: HTML CSS"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="mb-3 mt-1"
            />
          </form>
        </div>

        {/* PDF Preview */}
        <div>
          <Template1
            name={name}
            about={about}
            education={education}
            skills={skills}
          />
        </div>
      </div>
    </div>
  );
}
