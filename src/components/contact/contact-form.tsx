"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fadeUp, staggerContainer } from "@/components/ui/motion";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const body = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      setState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-10 flex flex-col items-center text-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
          <CheckCircle size={22} className="text-green-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">Message sent!</h3>
        <p className="text-sm text-white/50">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setState("idle")}
          className="mt-2"
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="glass rounded-2xl p-6 sm:p-8 space-y-5"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <motion.div variants={fadeUp} className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            autoComplete="name"
          />
        </motion.div>
        <motion.div variants={fadeUp} className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </motion.div>
      </div>

      <motion.div variants={fadeUp} className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          placeholder="What's this about?"
          required
        />
      </motion.div>

      <motion.div variants={fadeUp} className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project, idea, or just say hi..."
          required
          rows={5}
        />
      </motion.div>

      {state === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-red-400"
        >
          {errorMsg}
        </motion.p>
      )}

      <motion.div variants={fadeUp}>
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={state === "submitting"}
        >
          {state === "submitting" ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} />
              Send message
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}
