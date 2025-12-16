"use client"

import type React from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InputFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  required,
  error,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

interface TextAreaFieldProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string
  rows?: number
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function TextAreaField({
  label,
  name,
  placeholder,
  required,
  error,
  rows = 4,
  value,
  onChange,
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Textarea
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}

interface SelectFieldProps {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  error?: string
  options: { value: string; label: string }[]
  value?: string
  onValueChange?: (value: string) => void
}

export function SelectField({
  label,
  name,
  placeholder,
  required,
  error,
  options,
  value,
  onValueChange,
}: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Select name={name} value={value} onValueChange={onValueChange}>
        <SelectTrigger id={name}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
