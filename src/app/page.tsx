import { Example } from '@/modules/example'
import { cn } from '@/utils'
import { Text } from '@coqueirodigital/react-components'

export default async function Home() {
  async function exampleFetchData() {
    const delay = 2000 // 2 seconds
    await new Promise((resolve) => setTimeout(resolve, delay))

    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    return data
  }

  const data = await exampleFetchData()

  return (
    <>
      <section className="flex max-w-5xl flex-col gap-16 text-primary-regular">
        <Text tag="h1" variant="3xl/bold">
          Hello World
        </Text>
        <Example />
        <div>
          <Text tag="h2" variant="2xl/bold">
            Example Data from API
          </Text>
          <ul>
            {data.map((item: any, index: number) => (
              <li key={item.id} className={cn('text-primary-regular')}>
                {index} - {item.name}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
