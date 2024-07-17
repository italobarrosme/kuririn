import { Chat } from '@/modules/Chat'
import { Text } from '@coqueirodigital/react-components'

export default async function Home() {
  return (
    <>
      <section className="flex max-w-5xl flex-col gap-16 text-neutral-light">
        <Text tag="h1" variant="3xl/bold">
          Hello World - socket.io
        </Text>
        <Chat />
      </section>
    </>
  )
}
