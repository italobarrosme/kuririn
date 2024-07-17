'use client'

import {
  Button,
  InputNumber,
  Text,
  Toastify,
} from '@coqueirodigital/react-components'

export const Example = () => {
  const handleValue = (value: number | string) => {
    console.log(value)
  }

  return (
    <div className="flex max-w-5xl flex-col gap-4 text-primary-regular">
      <Text tag="h1" variant="md/bold">
        Example components from @coqueirodigital/react-components
      </Text>

      <Button
        variant="medium/regular"
        onClick={() =>
          Toastify({
            description:
              'Test Toastify component from @coqueirodigital/react-components',
            option: {
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              type: 'success',
            },
          })
        }
      >
        Hellow World
      </Button>

      <InputNumber
        label="Enter a number"
        name="number-input"
        currency="USD"
        onChangeValue={handleValue}
      />
    </div>
  )
}
