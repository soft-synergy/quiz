'use client'
import { useEffect, useRef } from 'react'
import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'
import styles from './DatePicker.module.css'

interface Props {
  value: string        // yyyy-MM-dd
  onChange: (value: string) => void
}

export default function DatePicker({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const fpRef = useRef<flatpickr.Instance | null>(null)

  useEffect(() => {
    if (!inputRef.current) return

    const fp = flatpickr(inputRef.current, {
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'j F Y',
      defaultDate: value || undefined,
      minDate: 'today',
      disableMobile: true,
      onChange: (dates, dateStr) => {
        onChange(dateStr)
      },
    }) as flatpickr.Instance

    fpRef.current = fp

    // Hide the original input (flatpickr sets type="hidden" but it can still show)
    if (inputRef.current) {
      inputRef.current.style.display = 'none'
    }

    // Style the alt input to match the app design
    const altInput = fp.altInput as HTMLInputElement | undefined
    if (altInput) {
      altInput.className = styles.input
      altInput.placeholder = 'Select a date'
    }

    return () => {
      fp.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (fpRef.current && value) {
      fpRef.current.setDate(value, false)
    }
  }, [value])

  return (
    <div className={styles.wrap}>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          readOnly
          placeholder="Select a date"
          className={styles.input}
        />
      </div>
    </div>
  )
}
