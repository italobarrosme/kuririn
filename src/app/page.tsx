// import { Chat } from '@/modules/Chat'

import { PaymentsList } from '@/modules/Payments'

export default async function Home() {
  return (
    <>
      <section className="flex max-w-7xl flex-col gap-16 text-neutral-light">
        {/* <Chat /> */}
        <PaymentsList />
      </section>
    </>
  )
}
