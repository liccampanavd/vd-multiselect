import React, { useEffect, useState } from 'react'

import { MultiSelect } from '@liccampanavd/vd-multiselect'
import '@liccampanavd/vd-multiselect/dist/index.css'

import data from './data.json'

const App = () => {
  const [lines, setLines] = useState([])
  const [store, setStore] = useState([])
  const [loadingStore, setLoadingStore] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setStore(data)
      setLoadingStore(false)
    }, 4000)
  }, [])

  const handleChange = (values) => {
    setLines(values)
  }

  return (
    <MultiSelect
      title='Favourite Programming Languages'
      height='250px'
      selectionMode='multiple'
      store={store}
      labelKey='lineDesc'
      valueKey='lineId'
      value={lines}
      loading={loadingStore}
      onValueChanged={(values) => handleChange(values)}
    />
  )
}

export default App
