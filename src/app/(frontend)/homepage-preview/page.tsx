import { redirect } from 'next/navigation'

// The branch now serves the complete site at its normal homepage URL.
export default function HomepagePreview() {
  redirect('/')
}
