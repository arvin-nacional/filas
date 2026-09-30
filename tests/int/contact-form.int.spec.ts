import { createElement } from 'react'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Form } from '@payloadcms/plugin-form-builder/types'

vi.mock('next/navigation', () => ({ useRouter: () => ({ push: vi.fn() }) }))
vi.mock('@/utilities/getURL', () => ({ getClientSideURL: () => '' }))
vi.mock('@/components/RichText', () => ({
  default: () => createElement('p', null, 'Thank you for reaching out.'),
}))

import { FormBlock } from '@/blocks/Form/Component'
import { getFormDefaults, getSubmissionData } from '@/blocks/Form/formValues'
import { validateSubmission } from '@/blocks/Form/validateSubmission'

const form: Form = {
  id: 'inquiry-test',
  title: 'Inquiry',
  submitButtonLabel: 'Send inquiry',
  confirmationType: 'message',
  emails: [],
  fields: [
    { blockType: 'text', name: 'name', label: 'Your name', required: true },
    { blockType: 'email', name: 'email', label: 'Email address', required: true },
    { blockType: 'checkbox', name: 'commerce', label: 'Commerce', defaultValue: false },
  ],
}

beforeEach(() => {
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

const fillRequired = () => {
  fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: 'Test visitor' } })
  fireEvent.change(screen.getByLabelText(/Email address/), {
    target: { value: 'visitor@example.com' },
  })
}
const submit = () =>
  fireEvent.submit(screen.getByRole('button', { name: 'Send inquiry' }).closest('form')!)

describe('Contact inquiry form', () => {
  it('validates required fields, email syntax, and unexpected answers on the server', () => {
    expect(validateSubmission(form.fields || [], [])).toContain('required')
    expect(validateSubmission(form.fields || [], [{ field: 'name', value: '  ' }])).toContain(
      'required',
    )
    expect(
      validateSubmission(form.fields || [], [
        { field: 'name', value: 'Visitor' },
        { field: 'email', value: 'bad@address' },
      ]),
    ).toContain('valid email')
    expect(
      validateSubmission(form.fields || [], [{ field: 'unexpected', value: 'ignored?' }]),
    ).toBe('Invalid form answers.')
    expect(
      validateSubmission(form.fields || [], [
        { field: 'name', value: 'Visitor' },
        { field: 'name', value: 'Duplicate' },
      ]),
    ).toBe('Invalid form answers.')
    expect(
      validateSubmission(form.fields || [], [
        { field: 'name', value: 'Visitor' },
        { field: 'email', value: 'visitor@example.com' },
        { field: 'commerce', value: 'false' },
      ]),
    ).toBeUndefined()
  })

  it('gives an accessible email error and rejects whitespace-only names', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render(createElement(FormBlock, { form, enableIntro: false, variant: 'contact' }))
    fireEvent.change(screen.getByLabelText(/Your name/), { target: { value: '   ' } })
    fireEvent.change(screen.getByLabelText(/Email address/), { target: { value: 'invalid' } })
    submit()
    await waitFor(() => expect(screen.getByText('Enter a valid email address')).toBeTruthy())
    expect(screen.getByLabelText(/Email address/).getAttribute('aria-describedby')).toBe(
      'email-error',
    )
    expect(screen.getByLabelText(/Email address/).getAttribute('aria-invalid')).toBe('true')
    expect(screen.getByText('This field is required')).toBeTruthy()
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('handles an HTML server error without losing entered values', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => {
          throw new SyntaxError('Not JSON')
        },
      }),
    )
    render(createElement(FormBlock, { form, enableIntro: false, variant: 'contact' }))
    fillRequired()
    submit()
    await waitFor(() => expect(screen.getByRole('alert').textContent).toContain('Please try again'))
    expect((screen.getByLabelText(/Your name/) as HTMLInputElement).value).toBe('Test visitor')
  })
  it('initializes named values, excludes schema data, and serializes checkbox values', () => {
    expect(getFormDefaults(form.fields)).toEqual({ name: '', email: '', commerce: false })
    expect(
      getSubmissionData(form.fields, {
        name: 'Visitor',
        email: 'visitor@example.com',
        commerce: true,
        unexpected: 'ignore',
      }),
    ).toEqual([
      { field: 'name', value: 'Visitor' },
      { field: 'email', value: 'visitor@example.com' },
      { field: 'commerce', value: 'true' },
    ])
  })

  it('does not submit missing required fields', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    render(createElement(FormBlock, { form, enableIntro: false, variant: 'contact' }))
    submit()
    await waitFor(() => expect(screen.getAllByText('This field is required')).toHaveLength(2))
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sends one request for repeated submits and focuses the confirmation', async () => {
    let finish!: (response: Response) => void
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          finish = resolve
        }),
    )
    vi.stubGlobal('fetch', fetchMock)
    render(createElement(FormBlock, { form, enableIntro: false, variant: 'contact' }))
    fillRequired()
    const formElement = screen.getByRole('button', { name: 'Send inquiry' }).closest('form')!
    fireEvent.submit(formElement)
    fireEvent.submit(formElement)
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1))
    expect((screen.getByRole('button', { name: 'Sending…' }) as HTMLButtonElement).disabled).toBe(
      true,
    )
    const request = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(JSON.parse(request[1].body as string)).toEqual({
      form: 'inquiry-test',
      submissionData: [
        { field: 'name', value: 'Test visitor' },
        { field: 'email', value: 'visitor@example.com' },
        { field: 'commerce', value: 'false' },
      ],
    })
    await act(async () =>
      finish({ ok: true, json: async () => ({ doc: { id: 'mock-submission' } }) } as Response),
    )
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('status')))
  })

  it('keeps entered data and allows retry after a server error', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        status: 503,
        json: async () => ({ errors: [{ message: 'Please try again.' }] }),
      })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ doc: { id: 'mock-submission' } }) })
    vi.stubGlobal('fetch', fetchMock)
    render(createElement(FormBlock, { form, enableIntro: false, variant: 'contact' }))
    fillRequired()
    submit()
    await waitFor(() =>
      expect(screen.getByRole('alert').textContent).toContain('Please try again.'),
    )
    expect((screen.getByLabelText(/Your name/) as HTMLInputElement).value).toBe('Test visitor')
    submit()
    await waitFor(() => expect(screen.getByRole('status')).toBeTruthy())
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })
})
