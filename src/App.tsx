import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField'

type metadata = {
  description: string,
  name: string,
  type: string,
  value: string
}

type mockProps = {
  id: string,
  name: string,
  metadata: metadata[]
}[]

const mock: mockProps = [
  {
    id: '1',
    name: 'ApplicationOne',
    metadata: [
      {
        name: 'MetaDataOne',
        description: 'MetaTeste',
        type: 'alphanumeric',
        value: ''
      },
      {
        name: 'MetaDataTwo',
        description: 'MetaTeste2',
        type: 'number',
        value: ''
      }
    ]
  }
]

function App() {

  const [valuesTheInput, setValuesTheInput] = useState<metadata[]>([])

  useEffect(() => {
    setValuesTheInput(mock[0].metadata)
  }, [])

  const handleEvent = (e: any, name: string, index: number) => {
    const event = e.target.value

    const meta = mock[0].metadata.find((x) => x.name === name)

    const valueChange = valuesTheInput.find((x) => x.name === name)
    console.log(valueChange?.value)

    const isEqual = meta?.name === valueChange?.name

    if (isEqual && meta && valueChange) {
      valuesTheInput.splice(index, 1,
        {
          description: meta.description,
          name: meta.name,
          type: meta.type,
          value: valueChange?.value + event
        }
      )
    }

    console.log(valuesTheInput)
  }

  const testeApplication = (x: metadata, index: number) => (
    <>
      <TextField
        fullWidth
        placeholder={x.name}
        value={x.value}
        onChange={(e: any) => { handleEvent(e, x.name, index) }}
      />
      {x.description}
    </>
  )

  return (
    <>
      {valuesTheInput.map((x, index) => {
        return (
          <>
            {testeApplication(x, index)}
          </>
        )
      })}
    </>
  );
}

export default App;
