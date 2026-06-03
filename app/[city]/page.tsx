import { redirect } from 'next/navigation'

// Permanent redirect: city hub pages have moved to /locations/[city]
export default function CityRedirect({ params }: { params: { city: string } }) {
  redirect(`/locations/${params.city}`)
}
